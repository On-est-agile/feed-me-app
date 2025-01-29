import React from "react";
import gobs from "../assets/images/gobs.jpg";
import Return from "../components/return.js";
import { publishMessage } from "../services/MqttHandler.js"

function DeviceInfo() {
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  console.log(CLIENT_SECRET);
    const handleButtonClick = (value) => {
      console.log(`Bouton cliqué : ${value}`);
        publishMessage(
          `feedme/${CLIENT_SECRET}/commands/feeder/dispense`,
          JSON.stringify({
            amount: 25* value,
          })
        );
      };
    return (
      <div style={styles.container}>
        <div style={styles.returnButtonContainer}>
            <Return />
        </div>
        <h1 style={styles.title}>Gamelle 1</h1>
        <div style={styles.avatarContainer}>
          <img src={gobs} alt="Avatar du chat" style={styles.avatar} />
        </div>
        <div style={styles.infoContainer}>
          <p style={styles.infoText}>
            <strong>Nom du chat :</strong> Georges
          </p>
          <p style={styles.infoText}>
            <strong>Remplissage :</strong> 75%
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
