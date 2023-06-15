const express = require("express");

const personController = require('../controllers/personController')
const personRouter = express.Router();

personRouter.get('/', personController.getAllPerson);

personRouter.get('/:personId', personController.getOnePerson);

personRouter.post('/', personController.addPerson);

personRouter.put('/:personId', personController.updatePerson);

personRouter.delete('/:personId', personController.deleteOnePerson);

personRouter.delete('/', personController.deleteAllPerson);

personRouter.use((req, res) => {
    res.status(404).json({ message: `${req.path} endpoint is not found` });
});

module.exports = personRouter;
