const Patient = require('../models/patient.model.js'),
    signToken = require('../authHelperFunctions').signToken;

module.exports = {
    // list users
    index: async (req, res) => {
        try {
            const users = await Patient.find({});
            res.json(users);
        } catch(err) {
            alert(err);
        }
    },

    // get one user
    show: async (req, res) => {
        console.log("Current User:");
        console.log(req.user);

        try {
            const user = await Patient.findById(req.params.id);
            res.json(user);
        } catch(err) {
            alert(err);
        }
    },

    // creates new user
    create: async (req, res) => {
        try{
            //const user = await Patient.create(req.body);
            const patient = new Patient({
                name: {
                    first: req.body.first,
                    last: req.body.last
                },

                email: req.body.email,
                password: req.body.password
            })

            console.log(patient);
            patient.save();
            const token = await signToken(patient);
            console.log(token);
            res.json({success: true, message: "User created with token", token});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },

    // update a user
    update: async (req, res) => {
        try {
            const user = await Patient.findById(req.params.id);
            Object.assign(user, req.body);
            await user.save();

            res.json({success: true, message: "User updated", user});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },

    // delete a user
    destroy: async (req, res) => {
        try {
            const user = await Patient.findByIdAndRemove(req.params.id);
            res.json({success: true, message: "User deleted", user});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },

    authenticate: async (req, res) => {
        console.log(req.body);
        const user = await Patient.findOne({email: req.body.email});

        if(!user || !user.validPassword(req.body.password)) {
            return res.json({success: false, message: "Invalid Login"});
        }

        const token = await signToken(user);
        res.json({success: true, message: "Token attached", token});
    }
};