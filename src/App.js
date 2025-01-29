import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import DeviceInfo from "./pages/DeviceInfo";
import { connectMqtt, subscribeToTopic } from ".//services/MqttHandler.js";

function App() {
  const [balance, setBalance] = useState("");
  const [devices, setDevices] = useState("");
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  useEffect(() => {
    // 1. Connexion au broker MQTT
    connectMqtt("wss://test.mosquitto.org:8081");

    // 2. S'abonner au topic Gamelle1/remplissage
    subscribeToTopic(`feedme/${CLIENT_SECRET}/statuses/balance_bottom`, (receivedMessage) => {
      console.log("Message reçu : ", receivedMessage);
      setBalance(receivedMessage); 
    }); 
    
    subscribeToTopic(`feedme/${CLIENT_SECRET}/feeders`, (receivedMessage) => {
      console.log("Message reçu : ", receivedMessage);
      setDevices(receivedMessage); 
    });

  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home balance={balance} devices= {devices}/>} />
        <Route path="/device-info/:id" element={<DeviceInfo balance = {balance} devices={devices} />} />
      </Routes>
    </Router>
  );
}

export default App;
