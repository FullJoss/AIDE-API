let nextId = 0;

exports.Rappel = class {
  constructor(date, label) {
    this.date = date;
    this.label = label;
    this.id = nextId;
  }
};
