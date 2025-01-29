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
    <div style={styles.container}>
      <h1 style={styles.title}>Mes appareils</h1>
      <div style={styles.devices}>
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    borderBottom: "2px solid #ADD8E6",
    paddingBottom: "10px",
    width: "fit-content",
    marginTop: "50px",
  },
  devices: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "20px",
    width: "100%",
    maxWidth: "900px",
  },
};

export default Home;
