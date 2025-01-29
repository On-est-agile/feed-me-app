import React from "react";
import { useNavigate } from "react-router-dom";

function Device({device, message}) {
const navigate = useNavigate();
let amountValue = "N/A";
try {
  if (message && message.trim() !== "") { // Vérifie si `message` est valide
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.amount !== undefined) {
      amountValue = parsedMessage.amount;
    }
  } else {
    console.warn("Message MQTT vide ou invalide, impossible de parser.");
  }
} catch (error) {
  console.error("Erreur lors de la conversion du message en JSON :", error);
}

const handleClick = () => {
    navigate(`/device-info/${device.id}`);
  };

  return (
    <div style={styles.deviceContainer} onClick={handleClick}>
      <h2 style={styles.title}>{device.gamelle}</h2>
      <p style={styles.percentage}>Remplissage : {amountValue}</p>
    </div>
  );
}

const styles = {
  deviceContainer: {
    width: "150px",
    height: "150px",
    border: "2px solid #ADD8E6",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: "0",
    color: "#333",
  },
  percentage: {
    fontSize: "0.9rem",
    color: "#666",
    marginTop: "10px",
  },
};

export default Device;
