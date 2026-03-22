function streamAudio(filePath) {
  const stream = fs.createReadStream(filePath, { highWaterMark: 512 }); // Chunks de 512 octets

  stream.on("data", (chunk) => {
    // On publie le buffer binaire directement
    client.publish(TOPIC_AUDIO, chunk, { qos: 0 });
  });

  stream.on("end", () => {
    console.log("Fin de la transmission");
  });
}

// Exemple : Lancer le stream via une route Express
// app.get('/play', (req, res) => { streamAudio('alerte.wav'); res.send('Lecture...'); });
