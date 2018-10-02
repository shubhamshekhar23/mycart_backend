const HttpStatus = require('http-status');
const Customer = require("../models/customer");
const Validation = require("./validation");
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');


exports.signup = async (req, res) => {         

    console.log("Creating customer..");

    try {

        let customer = await Customer.findOne({ email: req.body.email });

        if (!_.isNull(customer)) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: 'customer already exist with an email' });
            return;
        }
        console.log(req.body)

        let newCustomer = new Customer(req.body);
        let saveCustomer = await newCustomer.save();

        const token = jwt.sign({
            _id: saveCustomer._id
        }, config.jwtSecret)

        // res.cookie("t", token, {
        //     expire: new Date() + 9999
        // })
        res.status(HttpStatus.OK).json({ token: token, customer: saveCustomer });


    } catch (err) {
        Validation.errorHandling(err, res)
    }
};

exports.login = async (req, res) => {             

    console.log("Login customer..");

    try {

        let customer = await Customer.findOne({ email: req.body.email });

        if (_.isNull(customer)) {
            res.status(HttpStatus.UNAUTHORIZED).json({ error: 'customer does not exist with this email' });
            return;
        }

        if (!customer.authenticate(req.body.password)) {
            res.status(HttpStatus.UNAUTHORIZED).json({ error: "Email and password don't match." });
            return;
        }

        const token = jwt.sign({
            _id: customer._id
        }, config.jwtSecret)

        res.status(HttpStatus.OK).json({ token: token, customer: customer });


    } catch (err) {
        Validation.errorHandling(err, res)
    }
};

exports.logout = async (req, res) => {             

    console.log("Logging Out customer..");

    try {
        let customer = await Customer.findOne({ _id: req.params.id });

        if (_.isNull(customer)) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: 'customer does not exist with this id' });
            return;
        }

        res.status(HttpStatus.OK).json({ Message: "you have been Successfully logged out" });

    } catch (err) {
        Validation.errorHandling(err, res)
    }
};






















