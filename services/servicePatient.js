class Patient {
  constructor(lastname, firstname, age) {
    this.lastname = lastname;
    this.firstname = firstname;
    this.age = age;

    this.dateBegin = Date.now();
    this.dateEnd = null;

    this.isArchive = false;
  }
}

const allPatient = [];

exports.creerPatient = (lastname, firstname, age) => {
  const patient = new Patient(lastname, firstname, age);

  allPatient.push(patient);
};

exports.allPatient = allPatient;
