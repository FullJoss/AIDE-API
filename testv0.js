const { pipeline, env } = require("@huggingface/transformers");
const Speaker = require("speaker");
const wavefile = require("wavefile");
const fs = require("fs");

// Autorise l'utilisation de tous les cœurs logiques
env.allowLocalModels = true;
env.backends.onnx.wasm.numThreads = 8; // Ajuste selon ton CPU

async function playFrenchSpeech() {
  try {
    console.log("Initialisation...");
    const synthesizer = await pipeline("text-to-speech", "Xenova/mms-tts-fra", {
      dtype: "q8",
      device: "cpu",
    });

    const texte =
      "Dans le context ou l'on se croit malin, il y a toujours quelqu'un de plus fort. n'est tu pas d'accord ?";

    console.log("Synthèse vocale...");
    const result = await synthesizer(texte, { speaker_id: 2 });

    // 1. Configurer la sortie audio
    const speaker = new Speaker({
      channels: 1, // Mono
      bitDepth: 16, // 16-bit PCM
      sampleRate: result.sampling_rate,
    });

    // 2. Convertir Float32 (modèle) en Int16 (Haut-parleur)
    const float32Data = result.audio;
    const int16Buffer = Buffer.alloc(float32Data.length * 2);

    for (let i = 0; i < float32Data.length; i++) {
      // On bride le volume et on convertit
      const s = Math.max(-1, Math.min(1, float32Data[i]));
      int16Buffer.writeInt16LE(s < 0 ? s * 0x8000 : s * 0x7fff, i * 2);
    }

    // --- PARTIE 1 : ENREGISTREMENT WAV ---
    const wav = new wavefile.WaveFile();
    // On crée le fichier à partir des données Float32 brutes (result.audio)
    wav.fromScratch(1, result.sampling_rate, "32f", result.audio);
    // Optionnel : convertir en 16-bit pour un fichier plus standard/léger
    wav.toSampleRate(result.sampling_rate);

    fs.writeFileSync("sortie_audio.wav", wav.toBuffer());
    console.log("Fichier 'sortie_audio.wav' enregistré.");

    // 3. Envoyer directement au haut-parleur
    console.log("Lecture en cours...");
    const Readable = require("stream").Readable;
    const audioStream = new Readable();
    audioStream.push(int16Buffer);
    audioStream.push(null); // Fin du stream

    audioStream.pipe(speaker);

    speaker.on("close", () => console.log("Lecture terminée."));
  } catch (error) {
    console.error("Erreur :", error);
  }
}

playFrenchSpeech();
