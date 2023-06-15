const { Db } = require("typeorm");
const personsService = require("../services/personService");
const Joi = require("joi");

const personSchema = Joi.object().keys({
  name: Joi.string().required(),
  age: Joi.number().min(1).max(140).required(),
  hobbies: Joi.array().default([]).required(),
});

const getAllPerson = async (req, res) => {
  try {
    const persons = req.app.get("db");
    res.json(persons);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOnePerson = async (req, res) => {
  try {
    const persons = req.app.get("db");

    const result = await personsService.getOnePerson(
      req.params.personId,
      persons
    );

    if (!result) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const addPerson = async (req, res) => {
  try {
    let persons = req.app.get("db");
    let person = req.body;
    const { error } = personSchema.validate(person);

    if (error) {
      res.status(400).json(error);
    } else {
      await personsService.addPerson(person, persons);

      res.sendStatus(200);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePerson = async (req, res) => {
  try {
    let persons = req.app.get("db");

    const { error, value } = personSchema.validate(req.body);

    if (error) {
      res.status(400).json(error);
    }

    const result = await personsService.updatePerson(
      req.params.personId,
      req.body,
      persons
    );

    if (!result) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteOnePerson = async (req, res) => {
  try {
    let persons = req.app.get("db");
    const response = await personsService.deleteOnePerson(
      req.params.personId,
      persons
    );
    if (!response) {
      res.sendStatus(404);
    } else {
      res.status(200).json(persons);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteAllPerson = async (req, res) => {
  try {
    let persons = req.app.get("db");
    persons = [];
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllPerson,
  getOnePerson,
  addPerson,
  updatePerson,
  deleteOnePerson,
  deleteAllPerson,
};
