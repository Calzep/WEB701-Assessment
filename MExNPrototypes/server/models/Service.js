const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    tokenCost: {
        type: Number,
        required: true
    },
    registeredBy: {
        type: String,
        required: true
    },
    type: {
        type: string,
        required: true
    }  
})

const Service = mongoose.model("Service", ServiceSchema)
module.exports = Service