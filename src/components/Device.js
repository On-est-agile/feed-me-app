import React from "react";

function Device() {
  return (
    <div style={styles.deviceContainer}>
      <h2 style={styles.title}>Gamelle 1</h2>
      <p style={styles.percentage}>Remplissage : 75%</p>
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
