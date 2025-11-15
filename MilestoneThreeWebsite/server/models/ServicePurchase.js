const mongoose = require('mongoose')

const ServicePurchaseSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
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

const ServicePurchase = mongoose.model("ServicePurchase", ServicePurchaseSchema)
module.exports = ServicePurchase