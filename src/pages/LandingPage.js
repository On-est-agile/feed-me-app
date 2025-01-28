import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import paw from "../assets/images/paw.jpg"; 
import longPaw from "../assets/images/longPaw.png";
function LandingPage() {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Déclenche l'animation
    setIsAnimating(true);

    // Change de page après 1 seconde
    setTimeout(() => {
      navigate("/home");
    }, 1000); // durée de l'animation
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.topSection,
          transform: isAnimating ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 1s ease",
        }}
      >
        <h1 style={styles.title}>Feed Me</h1>
      </div>
      <div
        style={{
          ...styles.bottomSection,
          transform: isAnimating ? "translateY(100%)" : "translateY(0)",
          transition: "transform 1s ease",
        }}
      >
        <div style={styles.catPawsContainer}>
          <img src={longPaw} alt="Left paw" style={styles.catPaw} />
          <img src={longPaw} alt="Right paw" style={styles.catPaw} />
        </div>
      </div>
      <div
        style={{
          ...styles.paw,
          transform: isAnimating
            ? "translate(-50%, -500%) scale(1)"
            : "translate(-50%, -50%) scale(1)",
          transition: "transform 1s ease",
        }}
        onClick={handleButtonClick}
      >
        <img src={paw} alt="Paw Button" style={styles.pawImage} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily: "'Cursive', Arial, sans-serif",
    overflow: "hidden",
  },
  topSection: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "50%", 
    backgroundColor: "#ADD8E6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "black",
  },
  bottomSection: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "50%", 
    backgroundColor: "white",
  },
  paw: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100px",
    height: "100px",
    backgroundColor: "white",
    borderRadius: "50%",
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 1s ease",
  },
  pawImage: {
    borderRadius: "50%",
    width: "80%",
    height: "80%",
  },
  catPawsContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: "100%",
    paddingBottom: "20px",
  },
  catPaw: {
    width: "70px",
    height: "auto",
  },
};

export default LandingPage;
