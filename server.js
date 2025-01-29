const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000; // 📌 Port du serveur
const filePath = path.join(__dirname, "./src/data/devices.json"); // 🔹 JSON dans `src/data`

app.use(express.json()); // 🔹 Lire le JSON envoyé depuis React
app.use(cors()); // 🔹 Autoriser les requêtes depuis React

// 🔹 Lire les devices
app.get("/devices", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Erreur de lecture du fichier" });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// 🔹 Modifier un device (changer le nom)
app.put("/devices/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Erreur de lecture du fichier" });
      return;
    }

    let devices = JSON.parse(data);
    let device = devices.find((d) => d.id === parseInt(id));

    if (!device) {
      res.status(404).json({ error: "Device non trouvé" });
      return;
    }

    device.name = name;

    fs.writeFile(filePath, JSON.stringify(devices, null, 2), "utf8", (err) => {
      if (err) {
        res.status(500).json({ error: "Erreur de sauvegarde" });
        return;
      }
      res.json({ success: true, device });
    });
  });
});

// 🔹 Ajouter un device
app.post("/devices", (req, res) => {
  const { name } = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Erreur de lecture du fichier" });
      return;
    }

    let devices = JSON.parse(data);
    const newDevice = { id: devices.length + 1, gamelle: `Gamelle${devices.length + 1}`, name, remplissage: 100 };

    devices.push(newDevice);

    fs.writeFile(filePath, JSON.stringify(devices, null, 2), "utf8", (err) => {
      if (err) {
        res.status(500).json({ error: "Erreur de sauvegarde" });
        return;
      }
      res.json({ success: true, newDevice });
    });
  });
});

// 🔹 Supprimer un device
app.delete("/devices/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Erreur de lecture du fichier" });
      return;
    }

    let devices = JSON.parse(data);
    devices = devices.filter((d) => d.id !== parseInt(id));

    fs.writeFile(filePath, JSON.stringify(devices, null, 2), "utf8", (err) => {
      if (err) {
        res.status(500).json({ error: "Erreur de sauvegarde" });
        return;
      }
      res.json({ success: true });
    });
  });
});

// 🔹 Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur Node.js lancé sur http://localhost:${PORT}`);
});
