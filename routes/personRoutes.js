import express from "express";

const personRouter = express.Router();

personRouter.get('/', getAllPerson);

personRouter.get('/:personId', getOnePerson);

personRouter.post('person', addPerson);

personRouter.put('/:personId', editPerson);

personRouter.delete(':/personId', deleteOnePerson);

personRouter.delete('/', deleteAllPerson);

personRouter.use((req, res) =>{
    res.status(404).json({message: `${req.path} endpoint is not found`})
})