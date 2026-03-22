const serviceTalk = require("../services/siwisTalk");

exports.getTalk = (req, res) => {
  const isok = serviceTalk.talk(req.query.text);

  if (isok) res.status(201);
  else res.status(500).send("Erreur");
};
