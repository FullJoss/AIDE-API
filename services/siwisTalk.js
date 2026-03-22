const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const Speaker = require("speaker");
const wav = require("wav");

exports.talk = (texte) => {
  const outputFile = path.join(__dirname, "sortie.wav");
  const modelPath = "./test/sherpa/fr_FR-siwis-medium.onnx";

  // 1. Commande Piper
  const commande = `echo "${texte}" | piper.exe --model ${modelPath} --output_file ${outputFile}`;

  exec(commande, (error) => {
    if (error) {
      console.error("Erreur Piper:", error);
      return false;
    }
    // Ici tu peux envoyer le fichier ou le streamer via MQTT

    // 2. Lecture du fichier généré
    const file = fs.createReadStream(outputFile);
    const reader = new wav.Reader();

    // Quand le décodeur WAV a lu l'en-tête du fichier
    reader.on("format", function (format) {
      // On envoie les données brutes au Speaker (Haut-parleurs)
      reader.pipe(new Speaker(format));
    });

    file.pipe(reader);

    reader.on("end", () => {
      console.log("✅ Fin de la lecture locale");
    });

    return true;
  });
};
