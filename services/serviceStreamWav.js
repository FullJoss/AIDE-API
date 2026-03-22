const mqtt = require("mqtt");
const fs = require("fs");

// Utilise l'IP de ton PC et le port standard de Mosquitto
const BROKER_URL = "mqtt://192.168.1.154:1883";
const client = mqtt.connect(BROKER_URL);
const TOPIC_AUDIO = "esp32/audio_stream";

client.on("connect", () => {
  console.log("✅ Connecté au broker MQTT sur " + BROKER_URL);
});

exports.streamAudio = (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.error("❌ Fichier introuvable :", filePath);
    return;
  }

  // Lecture du fichier en sautant le header WAV (44 octets)
  // highWaterMark : taille des paquets envoyés à l'ESP32
  const stream = fs.createReadStream(filePath, {
    start: 44,
    highWaterMark: 512,
  });

  console.log(`🚀 Transmission de ${filePath} vers l'ESP32...`);

  stream.on("data", (chunk) => {
    stream.pause();

    client.publish(TOPIC_AUDIO, chunk, { qos: 0 }, (err) => {
      if (err) console.error("Erreur d'envoi MQTT :", err);

      // Ajustement du délai : 10ms est idéal pour du 24kHz
      setTimeout(() => {
        stream.resume();
      }, 10);
    });
  });

  stream.on("end", () => {
    console.log("🏁 Transmission terminée.");
    // On envoie 512 octets de silence (0) pour vider proprement le buffer I2S
    const silence = Buffer.alloc(512, 0);
    client.publish(TOPIC_AUDIO, silence);
  });
};
