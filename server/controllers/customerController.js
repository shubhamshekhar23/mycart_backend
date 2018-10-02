const HttpStatus = require('http-status');
const Customer = require("../models/customer");
const _ = require('lodash');
const Validation = require("./validation");


exports.addCart = async (req, res) => {             
    console.log("Adding product in Cart..");

    try {

        let customer = await Customer.findOne({ _id: req.params.userid, cart: {$nin: [req.params.productid]} });

        if (_.isNull(customer)) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: 'Product already exist' });
            return;
        }
        if (_.isEmpty(customer.cart) || !customer.cart) {
            customer.cart = [];
        }

        let fullCustomer = await Customer.findOneAndUpdate({ _id: req.params.userid }, {
            $push: { 'cart': req.params.productid},
          },{new: true}).populate('cart')
        //   console.log(fullCustomer);
        res.status(HttpStatus.OK).json(fullCustomer);

    } catch (err) {
        Validation.errorHandling(err, res)
    }
};

exports.fetch = async (req, res) => {                                               

    console.log("Getting Customer with id : " + req.params.userid);

    try {
        let customer = await Customer.findOne({ _id: req.params.userid }).populate('cart');

        if (_.isNull(customer)) {
            res.status(HttpStatus.NOT_FOUND).json({ error: 'Customer not found' });
            return;
        }
        res.status(HttpStatus.OK).json(customer);

    } catch (err) {
        Validation.errorHandling(err, res)
    }
};