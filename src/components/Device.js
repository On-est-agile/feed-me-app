import React from "react";
import { useNavigate } from "react-router-dom";

function Device({ device, message }) {
  const navigate = useNavigate();
  let state = "N/A"; // 🔹 Par défaut, on affiche N/A
  let amountValue = null;

  const deviceid = device?.id || "Nom inconnu";
  const deviceName = device?.name || "Nom inconnu";
  const deviceUid = device.uid;

  try {
    if (message && message.trim() !== "") {
      const parsedMessage = JSON.parse(message);
      if (
        parsedMessage.amount !== undefined &&
        !isNaN(parsedMessage.amount) // 🔹 Vérifier que c'est bien un nombre
      ) {
        amountValue = parsedMessage.amount;

        if (amountValue >= 0 && amountValue < 20) {
          state = "🔴"; // Rouge si entre 0 et 20
        } else {
          state = "🟢"; // Vert si supérieur à 20
        }
      }
    }
  } catch (error) {
    console.error("Erreur lors de la conversion du message en JSON :", error);
  }

  const handleClick = () => {
    navigate(`/device-info/${deviceid}`);
  };

  return (
    <div className="device-container" onClick={handleClick}>
      <h2 className="device-title">{deviceName}</h2>
      <p className="device-percentage">
        <strong>État :</strong> {state}
      </p>
      <p className={deviceUid ? "device-uid" : "device-unpaired"}>
        {deviceUid ? "✔️ Appairé" : "❌ Device non appairé"}
      </p>
    </div>
  );
}

export default Device;
