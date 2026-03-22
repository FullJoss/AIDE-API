const express = require("express");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const callRoutes = require("./routes/callRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const partientRoutes = require("./routes/patientRoutes");
const talkRoutes = require("./routes/talkRoutes");
const serviceSpeakStream = require("./services/serviceStreamWav");
const app = express();

const mqtt = require("mqtt");

// Connexion au broker (ton PC)
const client = mqtt.connect("mqtt://127.0.0.1:1883");
const TOPIC = "esp32/audio_stream";

client.on("connect", () => {
  console.log("✅ Connecté !");
  client.subscribe(TOPIC);
});

client.on("message", (topic, message) => {
  // Affiche le message (converti en texte si c'est une chaîne)
  console.log(`📩 [${topic}] : ${message.toString()}`);
});

//#region Tout les endpoints
// Autorise toutes les origines et les méthodes
app.use(cors());

app.use(express.json());

app.get("/users", userRoutes);
app.use("/call", callRoutes);
app.use("/reminder", reminderRoutes);
app.use("/patient", partientRoutes);
app.get("/speak", (req, res) => {
  serviceSpeakStream.streamAudio("sortie_audio.wav");
});
app.use("/talk", talkRoutes);
//#endregion

app.listen(3000, "0.0.0.0", () => {
  console.log(`Serveur lancé sur http://0.0.0.0:${3000}`);
});
