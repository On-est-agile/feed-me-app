import React, { useState, useEffect } from "react";
import Device from "../components/Device";
import devicesData from "../data/devices.json"; // 🔹 Import du JSON local en cas de fallback

function Home({ balance, devices }) {
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
          parsedDevices.map((device, index) => (
            <Device key={index} device={device} message={balance} />
          ))
        ) : (
          <p>🔄 Chargement des appareils...</p>
        )}
      </div>
    </div>
  );
}


export default Home;
