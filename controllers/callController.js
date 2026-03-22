const { pipeline } = require("@huggingface/transformers");
const fs = require("fs");
const { WaveFile } = require("wavefile");

const service_AI = require("../services/serviceAI");
const service_TTS = require("../services/serviceSpeech");

let transcriber = null;

async function init() {
  return await pipeline("automatic-speech-recognition", "Xenova/whisper-tiny", {
    dtype: "fp32",
  });
}

async function loadFile(filePath) {
  // 2. Lecture et normalisation manuelle
  const buffer = fs.readFileSync(filePath);
  return await STT(buffer);
}

async function STT(buffer) {
  try {
    const wav = new WaveFile(buffer);

    // On force les réglages requis par Whisper
    wav.toSampleRate(16000); // 16khz
    wav.toBitDepth("32f");

    // Extraction des échantillons
    let audioData = wav.getSamples();

    // --- ÉTAPE CRUCIALE : LA VÉRIFICATION ---
    if (!audioData || audioData.length === 0) {
      console.error("Erreur : Le fichier audio semble vide après conversion.");
      return;
    }
    console.log("Nombre d'échantillons envoyés à l'IA :", audioData.length);

    console.log("Transcription en cours...");

    const output = await transcriber(audioData, {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "french",
      task: "transcribe",
      return_timestamps: false,
    });

    if (output.text && output.text.trim().length > 0) {
      console.log("Texte détecté :", output.text);
      return output.text;
    } else {
      console.log("Texte détecté : [RIEN - Silence détecté par l'IA]");
    }
  } catch (error) {
    console.error("Erreur technique :", error);
  }

  return null;
}

exports.getCallResponse = async (req, res) => {
  if (transcriber == null) transcriber = await init();

  // const text = await loadFile("output.wav");
  const text =
    "Dans le context ou l'on se croit malin, il y a toujours quelqu'un de plus fort. n'est tu pas d'accord ?";

  if (text == null) {
    res.send("Rien");
  } else {
    const response = await service_AI.goGemma(text);
    await service_TTS.playFrenchSpeech(response);

    res.send(response);

    return response;
  }
};
