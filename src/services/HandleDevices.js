import devices from "../data/devices.json"; // Import direct du JSON

// Lire les devices
const getDevices = () => {
  return devices;
};

// Ajouter un device (simule l'ajout)
const addDevice = (name) => {
  const newDevice = { id: devices.length + 1, gamelle: `Gamelle${devices.length + 1}`, name, remplissage: 100 };
  devices.push(newDevice);
  return newDevice;
};

// Modifier le name d'un device
const updateDeviceName = (id, name) => {
  const device = devices.find((d) => d.id === id);
  if (device) {
    device.name = name;
  }
  return device;
};

// Supprimer un device
const deleteDevice = (id) => {
  const index = devices.findIndex((d) => d.id === id);
  if (index !== -1) {
    devices.splice(index, 1);
  }
};

const DeviceService = { getDevices, addDevice, updateDeviceName, deleteDevice };

export default DeviceService;
