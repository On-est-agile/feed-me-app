import React, {useState, useEffect} from "react";
import Device from "../components/Device";
import DeviceService from "../services/HandleDevices";

function Home({ message }) {

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const data = await DeviceService.getDevices();
      setDevices(Array.isArray(data) ? data : []);
    };

    fetchDevices();
  }, [])

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mes appareils</h1>
      <div style={styles.devices}>
      {devices.map((device) => (
          <Device key={device.id} device={device} message={message} />
        ))}
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
