import React from "react";

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mes appareils</h1>
      {/* Contenu principal de la page */}
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
};

export default Home;
