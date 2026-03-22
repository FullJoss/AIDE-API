let nextId = 0;

class Rappel {
  constructor(date, label) {
    this.date = date;
    this.label = label;
    this.id = nextId++;
  }
}

const allRappel = [new Rappel("22:30:10", "Paracetamole")];

exports.createProgramme = (date, label) => {
  let rappel = new Rappel(date, label);

  allRappel.push(rappel);
};
exports.loadProgramme = (id) => {
  const data = allRappel.find((a) => a.id == id);
  console.log(data);

  return data;
};
