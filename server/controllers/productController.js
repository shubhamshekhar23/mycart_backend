const HttpStatus = require('http-status');
const Product = require("../models/product");
const _ = require('lodash');
const Validation = require("./validation");



exports.list = async (req, res) => {          

    console.log("Getting List of products...");

    try {
        let skip = null;
        let limit = null;
        console.log(req.query.skip)
        if (req.query.skip) {
            skip = parseInt(req.query.skip);
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        let products = await Product.find({});
        if (skip!==null && limit!==null) {
            let prodList = await Product.find({}).skip(skip).limit(limit).exec();
            res.status(HttpStatus.OK).json(prodList);
        } else {
            res.status(HttpStatus.OK).json(products);
        }
    } catch (err) {
        Validation.errorHandling(err, res)
    }
};

exports.fetch = async (req, res) => {

    console.log("Getting Product with id : " + req.params.id);

    try {
        let product = await Product.findById(req.params.id);

        if (_.isNull(product)) {
            res.status(HttpStatus.NOT_FOUND).json({ error: 'Product not found' });
            return;
        }
        res.status(HttpStatus.OK).json(product);

    } catch (err) {
        Validation.errorHandling(err, res)
    }
};

exports.addProduct = async (req, res) => {

    console.log("Adding new Product: ");

    try {
        console.log(req.body)
        let saveProduct = null;
        if (_.isArray(req.body)) {
            saveProduct = await Product.insertMany(req.body)
        }
        else if (_.isObject(req.body)) {
            let newProduct = new Customer(req.body);
            saveProduct = await newProduct.save();
        }
        res.status(HttpStatus.OK).json(saveProduct);

    } catch (err) {
        Validation.errorHandling(err, res)
    }
};