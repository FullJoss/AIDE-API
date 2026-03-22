const serviceProgramme = require("../services/serviceProgramme");

exports.postCreate = (req, res) => {
  const date = res.query.date;
  const label = res.query.label;

  serviceProgramme.createProgramme(date, label);
  res.json({ statut: "creer" });
};

exports.postLoad = (req, res) => {
  const id = res.query.id;

  if (id) {
    const response = serviceProgramme.loadProgramme();

    if (response) {
      res.json({ statut: "ouvert", value: response });
      return;
    }
  }

  res.json({ statut: "erreur" });
};
