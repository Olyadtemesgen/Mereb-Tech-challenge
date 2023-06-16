const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json({ extended: false }));

let persons = [{
    id: '1',
    name: 'Sam',
    age: '26',
    hobbies: []
}] //This is your in memory database

app.use(cors());
app.set('db', persons)
//TODO: Implement crud of person

const personRoutes = require('./routes/personRoutes');

app.use("/person",personRoutes);

app.use((req, res) => {
    res.status(404).json({message: `${req.path} endpoint is not found"`})
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Internal server error'});
  });

if (require.main === module) {
    app.listen(3000, () => {
        console.log(`Server is running on server port 3000`);})
}
module.exports = app;