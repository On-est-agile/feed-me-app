import React from "react";
import { useNavigate } from "react-router-dom";

function Device({ device, message }) {
  const navigate = useNavigate();
  let amountValue = "N/A";


  const deviceid = device?.id || "Nom inconnu";
  const deviceName = device?.name || "Nom inconnu";
  const deviceUid = device.uid;

  try {
    if (message && message.trim() !== "") {
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.amount !== undefined) {
        amountValue = parsedMessage.amount + "%";
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
      <p className="device-percentage">Remplissage : {amountValue}</p>
      <p className={deviceUid ? "device-uid" : "device-unpaired"}>
        {deviceUid ? "✔️ Appairé" : "❌ Device non appairé"}
      </p>
    </div>
  );
}

export default Device;
