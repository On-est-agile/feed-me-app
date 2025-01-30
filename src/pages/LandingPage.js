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
    <div className="landing-container">
      <div
        style={{
          ...styles.topSection,
          transform: isAnimating ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 1s ease",
        }}
      >
        <h1 className="landing-title">FeedMe</h1>
      </div>
      <div
        style={{
          ...styles.bottomSection,
          transform: isAnimating ? "translateY(100%)" : "translateY(0)",
          transition: "transform 1s ease",
        }}
      >
        <div className="landing-cat-paws-container">
          <img src={longPaw} alt="Left paw" className="landing-cat-paw" />
          <img src={longPaw} alt="Right paw"className="landing-cat-paw" />
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
        <img src={paw} alt="Paw Button" className="landing-paw img" />
      </div>
    </div>
  );
}

const styles = {
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
};

export default LandingPage;
