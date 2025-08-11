const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3001
const mongoUrl = ""
app.use(express.json())

mongoose.connect(mongoUrl, {})


app.get('/', async (req, res) => {
    res.status(200).send("Connected to server")
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})