import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import DeviceInfo from "./pages/DeviceInfo";
import { connectMqtt, subscribeToTopic } from ".//services/MqttHandler.js";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // 1. Connexion au broker MQTT
    connectMqtt("wss://test.mosquitto.org:8081");

    // 2. S'abonner au topic Gamelle1/remplissage
    subscribeToTopic("Gamelle1/remplissage", (receivedMessage) => {
      console.log("Message reçu : ", receivedMessage);
      setMessage(receivedMessage); 
    });   
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/device-info" element={<DeviceInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
