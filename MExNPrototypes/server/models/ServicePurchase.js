const mongoose = require('mongoose')

const ServicePurchaseSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: Date
    },
    status: {
        type: String,
        required: true
    },
    temporalTokenCost: {
        type: Number,
        required: true
    }
})

const ServicePurchase = mongoose.model("User", ServicePurchaseSchema)
module.exports = ServicePurchase