const app = require('../index');
const axios = require('axios');

const assert = require('assert').strict;

let server;

describe("Test Person CRUD API", function () {
    before(() => {
        server = app.listen(3000);
    })

    after(() => {
        server.close()
    })
    it("Test Get", async function () {
        let persons = app.get('db')
        let res = await axios.get('http://localhost:3000/person')
        assert.equal(res.status, 200)
        assert.deepEqual(persons, res.data)
    });

    it("Test Get By ID", async function () {
        let persons = app.get('db')
        let res = await axios.get('http://localhost:3000/person/1')
        assert.equal(res.status, 200)
        assert.deepEqual(persons[0], res.data)
    });

    it("Test Post", async function () {
        let newUser = {
            name: 'keber',
            age: 24,
            hobbies: ['dubstep']
        }

        let res = await axios.post('http://localhost:3000/person', newUser)
        assert.equal(res.status, 200)
        let persons = app.get('db')
        let insertedUser = Object.assign({}, persons[1])
        delete insertedUser.id
        assert.deepEqual(insertedUser, newUser)
    });

    it("Test Post Validation All empty", async function () {
        let err;
        try {
            
            let res = await axios.post('http://localhost:3000/person', {})
        } catch(e) {
            err = e;
        }
        console.log(err.response.data);
        assert.equal(err?.response?.status, 400)

    }); 

    it("Test Post Validation name empty", async function () {
        let err;
        try {
            
            let res = await axios.post('http://localhost:3000/person', {age: 26, hobbies: []})
        } catch(e) {
            err = e;
        }
        console.log(err.response.data);
        assert.equal(err?.response?.status, 400)

    }); 

    it("Test Post Validation age empty", async function () {
        let err;
        try {
            
            let res = await axios.post('http://localhost:3000/person', {name: 'sam', hobbies: []})
        } catch(e) {
            err = e;
        }
        console.log(err.response.data);
        assert.equal(err?.response?.status, 400)

    });

    it("Test Post Validation age number", async function () {
        let err;
        try {
            
            let res = await axios.post('http://localhost:3000/person', {name: 'sam', age: 'bad', hobbies: []})
        } catch(e) {
            err = e;
        }
        console.log(err?.response?.data);
        assert.equal(err?.response?.status, 400)

    });
    
    it("Test Post Validation hobbies empty", async function () {
        let err;
        try {
            
            let res = await axios.post('http://localhost:3000/person', {name: 'sam', age: 21})
        } catch(e) {
            err = e;
        }
        assert.equal(err?.response?.status, 400)

    });
    
    it("Test Post Validation hobbies array", async function () {
        let err;
        try {
            
            let res = await axios.post('http://localhost:3000/person', {name: 'sam', age: 21, hobbies: 'fighting'})
        } catch(e) {
            err = e;
        }
        assert.equal(err?.response?.status, 400)

    }); 



    it("Test Put", async function () {
        let newUser = {
            name: 'Sam',
            age: 26,
            hobbies: ['dubstep', 'jazz']
        }
        let res = await axios.put('http://localhost:3000/person/1', newUser)

        let persons = app.get('db')
        newUser.id = "1"
        assert.deepEqual(persons[0], newUser)
    });

    it("Test delete", async function () {

        let res = await axios.delete('http://localhost:3000/person/1')

        let persons = app.get('db')

        assert.deepEqual(persons.filter(p => p.id == '1'), [])
    });

    it("Test non existing user", async function () {
        let err;
        try {
            let res = await axios.get('http://localhost:3000/person/1')
        } catch (e) {
            err = e;
        }
        assert.equal(err.response.status, 404)

    });

    it("Test non existing endpoint", async function () {
        let err;
        try {
            let res = await axios.get('http://localhost:3000/test/non-exiting/endpoint')
        } catch (e) {
            err = e;
        }
        assert.equal(err.response.status, 404)

    });



});
