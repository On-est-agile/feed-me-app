import React from "react";
import Device from "../components/Device";

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mes appareils</h1>
      <div style={styles.devices}>
        <Device />
        <Device />
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
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333", 
    borderBottom: "2px solid #ADD8E6",
    paddingBottom: "10px",
    width: "fit-content",
    marginTop: "50px",
  },
  devices: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "20px",
    width: "100%", 
    maxWidth: "900px", 
  },
};

export default Home;
