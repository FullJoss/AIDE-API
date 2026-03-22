const db = require("../config/db");

// Post
exports.newPatient = (req, res) => {
  const { name, age, nextOfKinContact, primaryCondition, roomNumber } =
    req.body;
  const sql = `INSERT INTO patient (nom, age, contact_proche, condition, roomNumber) VALUES (?, ?, ?, ?, ?)`;

  console.log("USER CHECK NEW PATIENT");

  db.run(
    sql,
    [name, age, nextOfKinContact, primaryCondition, roomNumber],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID }); // Récupère l'ID généré
      console.log("id : ", this.lastID);
    },
  );
};

// Get
exports.getAllPatient = (req, res) => {
  const sql = `SELECT * FROM patient ORDER BY date_debut DESC LIMIT 10`;

  console.log("check all");

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    let finale = [];
    for (let row of rows) {
      let notifs = [];
      db.run(
        `SELECT * FROM rappel WHERE id = ${row.id}`,
        [],
        function (err, rowsrows) {
          if (err) return res.status(500).json({ error: err.message });
          notifs = rowsrows;
        },
      );

      finale.push({ ...row, statusLogs: [], patientNotifications: notifs });
    }

    res.json(finale);
  });
};
