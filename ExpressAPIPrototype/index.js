const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send("Connected to Nelson Disaster Response backend server")
})

//TODO Organise endpoints into different routes

//Login user
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //STUB

        console.log(email, password)
        
        throw new Error("API endpoint not implemented")
        

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})

//Register new user
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        //STUB

        console.log(email, password)
        
        throw new Error("API endpoint not implemented")

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})

//Get account details
app.get('/api/user', async (req, res) => {
    try {
        const id = req.query.id
        //STUB

        console.log(id)
        
        throw new Error("API endpoint not implemented")

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})

//Update account details
app.put('/api/user', async (req, res) => {
    try {
        const user = req.body
        //STUB

        console.log(user)
        
        throw new Error("API endpoint not implemented")

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})

//Check authorisation
app.get('/api/memberAuthorisation', async (req, res) => {
    try {
        const id = req.query.id
        //STUB

        console.log(id)
        
        throw new Error("API endpoint not implemented")

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})

//Register new service
app.post('/api/service', async (req, res) => {
    try {
        const service = req.body
        //STUB

        console.log(service)
        
        throw new Error("API endpoint not implemented")

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})

//Acquire tokens
app.post('/api/acquireToken', async (req, res) => {
    try {
        const id = req.body.id
        //STUB

        console.log(id)
        
        throw new Error("API endpoint not implemented")

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})

//Get service list
app.get('/api/allServices', async (req, res) => {
    try {
        //STUB
        
        throw new Error("API endpoint not implemented")

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})

//Get service info
app.get('/api/service', async (req, res) => {
    try {
        const id = req.query.id
        //STUB

        console.log(id)
        
        throw new Error("API endpoint not implemented")

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})

//Purchase service
app.post('/api/servicePurchase', async (req, res) => {
    try {
        const { serviceId, userId } = req.body;
        //STUB

        console.log(serviceId, userId)
        
        throw new Error("API endpoint not implemented")

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})

//Get pending transactions
app.get('/api/allServicePurchases', async (req, res) => {
    try {
        //STUB
        
        throw new Error("API endpoint not implemented")

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})

//Change transaction status
app.put('/api/servicePurchase', async (req, res) => {
    try {
        //STUB
        const { id, status } = req.body;
        
        throw new Error("API endpoint not implemented")

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})