const uuid = require("uuid");

const getOnePerson = (ids, persons) => {
  let persn = persons.find((person) => person.id === ids);
  if (persn === undefined) {
    return null;
  } else {
    return persn;
  }
};

const addPerson = (person, persons) => {
  var results = {
    id: uuid.v4(),
    name: person.name,
    age: person.age,
    hobbies: person.hobbies || [],
  };
  persons.push(results);
  return persons;
};

const deleteAllPerson = () => {
    return [];
  },
  deleteOnePerson = (id, persons) => {
    var length_before = persons.length;

    var index = persons.findIndex((person) => person.id === id);

    persons.splice(index, 1);

    if (length_before === persons.length) {
      return null;
    }
    return persons;
  };

const updatePerson = (id, person, persons) => {

  let index = persons.findIndex((person) => person.id === id);

  if (index === -1) {
    return null;
  }

  persons[index] = {
    id: persons[index].id,
    name: person.name,
    age: person.age,
    hobbies: person.hobbies || [],
  };
  return persons;
};

module.exports = {
  getOnePerson,
  addPerson,
  deleteAllPerson,
  deleteOnePerson,
  updatePerson,
};
