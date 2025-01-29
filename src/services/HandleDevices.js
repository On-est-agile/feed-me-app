const API_URL = "http://localhost:5000";

// 🔹 Lire les devices depuis le serveur
const getDevices = async () => {
  const res = await fetch(`${API_URL}/devices`);
  return res.json();
};

// 🔹 Modifier un device
const updateDeviceName = async (id, name) => {
  await fetch(`${API_URL}/devices/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
};

// 🔹 Ajouter un device
const addDevice = async (name) => {
  await fetch(`${API_URL}/devices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
};

// 🔹 Supprimer un device
const deleteDevice = async (id) => {
  await fetch(`${API_URL}/devices/${id}`, { method: "DELETE" });
};

export default { getDevices, addDevice, updateDeviceName, deleteDevice };
