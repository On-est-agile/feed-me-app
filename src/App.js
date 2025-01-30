import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import DeviceInfo from "./pages/DeviceInfo";
import { connectMqtt, subscribeToTopic } from "./services/MqttHandler.js";

function App() {
  const [balances, setBalances] = useState({}); // 🔹 Stocke les balances sous forme d'objet { id: balance }
  const [devices, setDevices] = useState("");
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

  useEffect(() => {
    // 1. Connexion au broker MQTT
    connectMqtt("wss://test.mosquitto.org:8081");

    // 2. Récupérer la liste des feeders
    subscribeToTopic(`feedme/${CLIENT_SECRET}/feeders`, (receivedMessage) => {
      setDevices(receivedMessage);

      try {
        const parsedDevices = JSON.parse(receivedMessage);
        if (parsedDevices.feeders) {
          parsedDevices.feeders.forEach((device) => {
            const topic = `feedme/${CLIENT_SECRET}/${device.id}/sensors/balance_bottom`;


            // 3. Souscrire à la balance de CHAQUE device
            subscribeToTopic(topic, (balanceMessage) => {
              setBalances((prevBalances) => ({
                ...prevBalances,
                [device.id]: JSON.parse(balanceMessage).amount, // 🔹 Associe la balance à l'ID du device
              }));
            });
          });
        }
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des feeders :", error);
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home balances={balances} devices={devices} />} />
        <Route path="/device-info/:id" element={<DeviceInfo balances={balances} devices={devices} />} />
      </Routes>
    </Router>
  );
}

export default App;
