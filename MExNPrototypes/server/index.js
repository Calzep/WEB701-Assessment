//ANCHOR Config

const express = require('express')
const mongoose = require('mongoose')

const UserModel =  require("./models/User")
const ServiceModel = require("./models/Service")
const ServicePurchaseModel = require("./models/ServicePurchase")

const app = express()
const port = 7011
const mongoUrl = "mongodb+srv://admin:admin@prototypeapps.bvtt3cc.mongodb.net/SharedMExNDatabase"
app.use(express.json())

mongoose.connect(mongoUrl, {})

//SECTION Endpoints

//ANCHOR Default
app.get('/', async (req, res) => {
    res.status(200).send("Connected to Nelson Disaster Response backend server MExN stack prototype")
})


//ANCHOR Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email })

        if (!user || !(user.password == password)) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        res.status(200).json({ message: 'Login successful' })

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})


//ANCHOR Register
app.post('/api/register', async (req, res) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        res.json({ message: 'Created new user' });
    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})


//ANCHOR Get user
app.get('/api/user/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }

        return res.status(200).json(user)

    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}`})
    }
})


//ANCHOR List services
app.get('/api/services', async (req, res) => {
    try {
        const services = await ServiceModel.find()
        res.status(200).json(services);
    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}` });
    }
});


//ANCHOR Get service
app.get('/api/service/:id', async (req, res) => {
    try {
        const service = await ServiceModel.findById(req.params.id)

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.status(200).json(service);
    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}` });
    }
});


//ANCHOR Create service purchase
app.post('/api/service-purchase', async (req, res) => {
    try {
        const { serviceId, userId } = req.body;

        // Get service
        const service = await ServiceModel.findById(serviceId);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        // Get user
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check token balance
        if (user.tokens < service.tokenCost) {
            return res.status(400).json({ error: 'Not enough tokens' });
        }

        // Deduct tokens
        user.tokens -= service.tokenCost;
        await user.save();

        // Create purchase record
        const purchase = new ServicePurchaseModel({
            service: service._id,
            user: user._id,
            date: new Date(),
            status: 'pending',           // could default to "pending"
            temporalTokenCost: service.tokenCost
        });
        await purchase.save();

        res.json({ 
            message: 'Service purchased successfully',
            remainingTokens: user.tokens,
            purchase
        });
    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}` });
    }
});


//ANCHOR List service purchases
app.get('/api/service-purchases', async (req, res) => {
    try {
        const purchases = await ServicePurchaseModel.find()
            .populate('service', 'name tokenCost')  // only return certain fields
            .populate('user', 'email firstName lastName tokens userType');
        res.status(200).json(purchases);
    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}` });
    }
});


//ANCHOR Update service purchase
app.put('/api/service-purchase/:id', async (req, res) => {
    try {
        const updates = { status: req.body.status }

        const purchase = await ServicePurchaseModel.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!purchase) {
            return res.status(404).json({ error: 'Service purchase not found' })
        }

        res.status(200).json({ message: 'Service purchase updated', purchase });
    } catch (err) {
        res.status(400).json({ error: `Something went wrong: ${err.message}` });
    }
});

//!SECTION

//ANCHOR Listen
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})