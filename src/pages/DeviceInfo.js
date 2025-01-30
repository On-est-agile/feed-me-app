import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import cat from "../assets/images/cat-56.png";
import Return from "../components/return.js";
import { publishMessage } from "../services/MqttHandler.js";
import devicesData from "../data/devices.json"; // 🔹 Import JSON local si MQTT ne fonctionne pas

function DeviceInfo({ devices, balance }) {
  const { id } = useParams(); // 🔹 `id` est le `name` du device
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
        console.log("Donnée :", parsedDevices);
      } else {
        // 🔹 Si pas de données MQTT, on prend `devices.json`
        console.log("⚠️ Aucune donnée MQTT, utilisation de devices.json");
        allDevices = devicesData.feeders || [];
      }

      // 🔹 Chercher le device par `name`
      const parsedId = parseInt(id, 10);
      const foundDevice = allDevices.find((d) => d.id === parsedId);
      setDevice(foundDevice);
      setNewName(foundDevice.name);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération du device :", error);
    }
  }, [id, devices]);

  let amountValue = "N/A";
  try {
    if (balance && balance.trim() !== "") {
      const parsedMessage = JSON.parse(balance);
      if (parsedMessage.amount !== undefined) {
        amountValue = parsedMessage.amount;
      }
    }
  } catch (error) {
    console.error("Erreur lors de la conversion du message en JSON :", error);
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
    <div style={styles.container}>
      <div style={styles.returnButtonContainer}>
        <Return />
      </div>

      <h1 style={styles.title}>Gamelle de {device.name}</h1>

      <div style={styles.avatarContainer}>
        <img src={cat} alt="Avatar du chat" style={styles.avatar} />
      </div>

      <div style={styles.infoContainer}>
        <p style={styles.infoText}>
          <strong>Nom du chat :</strong>{" "}
          {isEditing ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleSaveClick} style={styles.saveButton}>✅</button>
            </>
          ) : (
            <>
              {device.name}{" "}
              <button onClick={handleEditClick} style={styles.editButton}>✏️</button>
            </>
          )}
        </p>
        <p style={styles.infoText}>
          <strong>Remplissage :</strong> {amountValue}
        </p>
      </div>

      <div style={styles.refillSection}>
        <h2 style={styles.refillTitle}>Remettre des croquettes ?</h2>
        <div style={styles.buttonContainer}>
          {[1, 2, 3, 4, 5].map((number) => (
            <button key={number} style={styles.button} onClick={() => handleButtonClick(number)}>
              {number}
            </button>
          ))}
        </div>
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
  returnButtonContainer: {
    position: "absolute",
    top: "20px",
    left: "20px",
    zIndex: 10,
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    borderBottom: "2px solid #ADD8E6",
    paddingBottom: "10px",
    width: "fit-content",
    marginBottom: "20px",
  },
  avatarContainer: {
    width: "150px",
    height: "150px",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "20px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  },
  avatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  infoContainer: {
    textAlign: "center",
  },
  infoText: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "10px",
  },
  editButton: {
    border: "none",
    background: "transparent",
    fontSize: "1rem",
    cursor: "pointer",
    marginLeft: "8px",
  },
  input: {
    fontSize: "1rem",
    padding: "5px",
    border: "1px solid #ADD8E6",
    borderRadius: "5px",
  },
  saveButton: {
    border: "none",
    background: "transparent",
    fontSize: "1rem",
    cursor: "pointer",
    marginLeft: "8px",
  },
  refillSection: {
    marginTop: "30px",
    textAlign: "center",
  },
  refillTitle: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  button: {
    width: "40px",
    height: "40px",
    backgroundColor: "#ADD8E6",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
};

export default DeviceInfo;
