import mqtt from "mqtt";

let client = null;

/**
 * Connecte au broker MQTT et configure les événements.
 * @param {string} brokerUrl - URL du broker MQTT.
 * @param {object} options - Options de connexion MQTT.
 */
export const connectMqtt = (brokerUrl, options = {}) => {
  if (!client) {
    client = mqtt.connect(brokerUrl, options);

    client.on("connect", () => {
      console.log("Connecté au broker MQTT");
    });

    client.on("error", (err) => {
      console.error("Erreur MQTT : ", err);
    });

    client.on("close", () => {
      console.log("Déconnecté du broker MQTT");
    });
  }
};

/**
 * Abonne au topic spécifié.
 * @param {string} topic - Le topic auquel s'abonner.
 * @param {function} callback - Fonction appelée lorsqu'un message est reçu.
 */
export const subscribeToTopic = (topic, callback) => {
  if (!client) {
    console.error("Client MQTT non connecté.");
    return;
  }

  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Abonné au topic : ${topic}`);
    } else {
      console.error(`Erreur d'abonnement au topic ${topic} :`, err);
    }
  });

  client.on("message", (receivedTopic, message) => {
    if (receivedTopic === topic) {
      callback(message.toString());
    }
  });
};

/**
 * Publie un message sur le topic spécifié.
 * @param {string} topic - Le topic sur lequel publier.
 * @param {string} message - Le message à envoyer.
 */
export const publishMessage = (topic, message) => {
  if (!client) {
    console.error("Client MQTT non connecté.");
    return;
  }

  client.publish(topic, message, (err) => {
    if (!err) {
      console.log(`Message publié sur ${topic} : ${message}`);
    } else {
      console.error(`Erreur de publication sur ${topic} :`, err);
    }
  });
};

/**
 * Déconnecte le client MQTT.
 */
export const disconnectMqtt = () => {
  if (client) {
    client.end();
    client = null;
    console.log("Déconnecté du broker MQTT.");
  }
};
