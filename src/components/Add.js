import React from "react";

function Add({ onClick }) {
  return (
    <button onClick={onClick} style={styles.button}>
      <span style={styles.plus}>+</span>
    </button>
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
    position: "relative",
  },
  plus: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "white",
  },
};

export default Add;
