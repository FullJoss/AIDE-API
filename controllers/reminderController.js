const serviceProgramme = require("../services/serviceProgramme");
const db = require("../config/db");

exports.getReminderOld = (req, res) => {
  const id = req.query.id;

  console.log("id", id);

  const response = serviceProgramme.loadProgramme(id);

  console.log("POST : /reminder/");

  const r = response;
  console.log(r);

  if (response) res.json(r);
  else res.status(404).json({ statut: "undefined" });
};

exports.createReminder = (req, res) => {
  const { title, time, id } = req.body;
  const sql = `INSERT INTO rappel (date, label) VALUES (?, ?)`;

  console.log("USER CHECK NEW REMINDER");
  console.log(`temps : ${time} | ${title} | id : ${id}`);

  db.run(sql, [time, title], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID }); // Récupère l'ID généré
    console.log("id : ", this.lastID);
  });
};

// Get
exports.getReminder = (req, res) => {
  console.log("reminder check");

  res.json({ heure: 11, minute: 20 });
};
