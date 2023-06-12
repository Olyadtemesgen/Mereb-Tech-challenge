const express = require('express')
const app = express()

let persons = [{
    id: '1',
    name: 'Sam',
    age: '26',
    hobbies: []
}] //This is your in memory database

app.set('db', persons)
//TODO: Implement crud of person

const personService = require('./services/personService')(persons);
const personController = require('./controllers/personController')(personService);
const personRoutes = require('./routes/personRoutes');

app.use((req, res) => {
    res.status(404).json({message: `${req.path} endpoint is not found"`})
})

app.use('/person', personRoutes);

if (require.main === module) {
    app.listen(3000)
}
module.exports = app;