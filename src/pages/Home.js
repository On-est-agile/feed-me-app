import React, { useState, useEffect } from "react";
import Device from "../components/Device";
import devicesData from "../data/devices.json"; // 🔹 Import du JSON local en cas de fallback
import catWalk from "../assets/images/catWalk.png";

function Home({ balances, devices }) {
  const [parsedDevices, setParsedDevices] = useState([]);

  useEffect(() => {
    try {
      if (devices && devices.trim() !== "") {
        // 🔹 Si MQTT envoie des données, on les utilise
        const parsedData = JSON.parse(devices);
        console.log("📡 Données MQTT reçues :", parsedData);

        setParsedDevices(parsedData.feeders || []); // 🔹 Récupère uniquement `feeders`
      } else {
        // 🔹 Si pas de données MQTT, on prend celles du fichier JSON local
        console.log("⚠️ Aucune donnée MQTT, utilisation de devices.json");
        setParsedDevices(devicesData.feeders || []);
      }
    } catch (error) {
      console.error("❌ Erreur lors du parsing des devices :", error);
      setParsedDevices(devicesData.feeders || []); // 🔹 Fallback sur JSON local
    }
  }, [devices]);

  return (
    <div className="home-container">
      <h1 className="home-title">Mes appareils</h1>
      <div className="home-devices">
        {parsedDevices.length > 0 ? (
          parsedDevices.map((device) => (
            <Device
              key={device.id}
              device={device}
              message={balances[device.id] ? JSON.stringify({ amount: balances[device.id] }) : JSON.stringify({ amount: "N/A" })} 
            />
          ))
        ) : (
          <p>🔄 Chargement des appareils...</p>
        )}
      </div>
      <footer className="home-footer">
        <img src={catWalk} alt="Chat marchant" className="home-cat-image" />
      </footer>
    </div>
  );
}

export default Home;
