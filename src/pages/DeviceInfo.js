import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import cat from "../assets/images/cat-56.png";
import Return from "../components/return.js";
import { publishMessage } from "../services/MqttHandler.js";
import devicesData from "../data/devices.json"; // 🔹 Import JSON local si MQTT ne fonctionne pas

function DeviceInfo({ devices, balances }) {
  const { id } = useParams(); // 🔹 Récupère l'ID du device dans l'URL
  const [device, setDevice] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

  useEffect(() => {
    try {
      let allDevices = [];

      if (devices && devices.trim() !== "") {
        // 🔹 Si MQTT envoie des données, on les utilise
        const parsedDevices = JSON.parse(devices);
        allDevices = parsedDevices.feeders || [];
        console.log("📡 Donnée MQTT reçue :", parsedDevices);
      } else {
        // 🔹 Si pas de données MQTT, on prend `devices.json`
        console.log("⚠️ Aucune donnée MQTT, utilisation de devices.json");
        allDevices = devicesData.feeders || [];
      }

      // 🔹 Chercher le device par `id`
      const parsedId = parseInt(id, 10);
      const foundDevice = allDevices.find((d) => d.id === parsedId);
      
      if (foundDevice) {
        setDevice(foundDevice);
        setNewName(foundDevice.name);
      } else {
        console.error("❌ Device non trouvé !");
      }

    } catch (error) {
      console.error("❌ Erreur lors de la récupération du device :", error);
    }
  }, [id, devices]);

  // ✅ Chercher la balance associée à `device.id`
  const amountValue = device ? balances[device.id] || "N/A" : "N/A";

  // 🔴🟢 Définition de la pastille en fonction du `amountValue`
  let state = "N/A";
  if (amountValue !== "N/A") {
    state = amountValue >= 0 && amountValue < 20 ? "🔴" : "🟢";
  }

  const handleButtonClick = (value) => {
    console.log(`Bouton cliqué : ${value}`);
    publishMessage(
      `feedme/${CLIENT_SECRET}/${device.id}/commands/feeder/dispense`,
      JSON.stringify({
        amount: value,
      })
    );
  };

  if (!device) {
    return <h2>🔴 Gamelle introuvable</h2>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    publishMessage(
      `feedme/${CLIENT_SECRET}/feeders/${device.id}/rename`,
      JSON.stringify({
        name: newName,
      })
    );
    setDevice({ ...device, name: newName });
  };

  return (
    <div className="device-info-container">
      <div className="device-info-return-button">
        <Return />
      </div>

      <h1 className="device-info-title">Gamelle de {device.name}</h1>

      <div className="device-info-avatar-container">
        <img src={cat} alt="Avatar du chat" className="device-info-avatar" />
      </div>

      <div className="device-info-info-container">
        <p className="device-info-info-text">
          <strong>Nom du chat :</strong>{" "}
          {isEditing ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="device-info-input"
                maxLength={16}
              />
              <button onClick={handleSaveClick} className="device-info-save-button">✅</button>
            </>
          ) : (
            <>
              {device.name}{" "}
              <button onClick={handleEditClick} className="device-info-edit-button">✏️</button>
            </>
          )}
        </p>
        <p className="device-info-info-text"><strong> État :</strong> {state}</p>
      </div>

      <div className="device-info-refill-section">
        <h2 className="device-info-refill-title">Remettre des croquettes ?</h2>
        <div className="device-info-button-container">
          {[1, 2, 3, 4, 5].map((number) => (
            <button key={number} className="device-info-button" onClick={() => handleButtonClick(number)}>
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeviceInfo;
