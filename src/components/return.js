import React from "react";
import { useNavigate } from "react-router-dom";

function Return() {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(-1);
    };
    
    return (
        <div style={styles.button} onClick={handleClick}>
        <p style={styles.arrow}>&larr;</p>
        </div>
    );

}

const styles = {
    button: {
      width: "50px",
      height: "50px",
      backgroundColor: "#ADD8E6",
      borderRadius: "50%",
      border: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s ease",
    },
    arrow: {
      fontSize: "1.5rem",
      color: "white",
      fontWeight: "bold",
    },
  };

  export default Return;