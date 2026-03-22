const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://votre_broker_ip");
const TOPIC_AUDIO = "esp32/audio_stream";
const TOPIC_BC = "esp32/heartbpm";

client.on("connect", () => {
  console.log("Connecté au broker MQTT");
});

stream.on("data", (value) => {
  client.publish(TOPIC_BC, value, { qos: 1 });
});

stream.on("end", () => {
  console.log("Fin de la transmission");
});
