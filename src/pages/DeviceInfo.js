import React, {useState} from "react";
import gobs from "../assets/images/gobs.jpg";
import Return from "../components/return.js";
/* import EditButton from "../components/EditButton.js"; */
import { useParams } from "react-router-dom";
import { publishMessage } from "../services/MqttHandler.js";
import HandleDevices from "../services/HandleDevices";

function DeviceInfo({ message }) {
  const { id } = useParams(); // 🔹 Récupère l'ID de l'URL
  const device = HandleDevices.getDevices().find((d) => d.id === parseInt(id));
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

  // 🔹 État pour la modification du nom
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(device ? device.name : "");

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
    const handleButtonClick = (value) => {
      console.log(`Bouton cliqué : ${value}`);
        publishMessage(
          `feedme/${CLIENT_SECRET}/commands/feeder/dispense`,
          JSON.stringify({
            amount: 25* value,
          })
        );
      };
      if (!device) {
        return <h2>Gamelle introuvable</h2>;
      }

  // 🔹 Fonction pour activer la modification du nom
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 🔹 Fonction pour sauvegarder le nouveau nom
  const handleSaveClick = () => {
    HandleDevices.updateDeviceName(device.id, newName);
    setIsEditing(false);
  };

    
    return (
      <div style={styles.container}>
        <div style={styles.returnButtonContainer}>
            <Return />
        </div>
        {/* <div style={styles.editButtonContainer}>
        <EditButton />
      </div> */}
        <h1 style={styles.title}>{device.gamelle}</h1>
        <div style={styles.avatarContainer}>
          <img src={gobs} alt="Avatar du chat" style={styles.avatar} />
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
            <button
              key={number}
              style={styles.button}
              onClick={() => handleButtonClick(number)}
            >
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
        position: "absolute", // Place le bouton par rapport au conteneur
        top: "20px", // Décalé de 20px du haut
        left: "20px", // Décalé de 20px de la gauche
        zIndex: 10, // Assure que le bouton est au-dessus des autres éléments
      },
      /* editButtonContainer: {
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: 10,
      }, */
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
