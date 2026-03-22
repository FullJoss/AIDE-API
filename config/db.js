const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Le fichier sera créé automatiquement à la racine s'il n'existe pas
const dbPath = path.resolve(__dirname, "../database.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error("Erreur d'ouverture :", err.message);
  console.log("Connecté à la base SQLite locale.");
});

// Initialisation de la table (si elle n'existe pas)
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS patient (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT,
        age INTEGER,
        date_debut DATETIME DEFAULT CURRENT_TIMESTAMP,
        date_fin DATETIME,
        contact TEXT,
        contact_proche TEXT,
        roomNumber TEXT,
        status BOOLEAN DEFAULT TRUE,
        condition TEXT
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS rappel (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_patient INTEGER,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        label TEXT,
        receive BOOLEAN
    )`);
});

module.exports = db;
