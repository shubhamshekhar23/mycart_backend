const HttpStatus = require('http-status');
const customerController = require("./controllers/customerController");
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const jwt = require('jsonwebtoken');
const config = require('../config/config')


module.exports = (app) => {

    function loginAuth(req, res, next) {

        let authorization = req.headers.authorization;
        console.log(authorization)

        if (!authorization) {
            res.status(HttpStatus.UNAUTHORIZED).json({ error: 'HTTP authentication header required' });
            return;
        }

        let decoded = jwt.verify(authorization, config.jwtSecret, (err, token) => {
            if (err) {
                res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Token not Valid' });
            }
            else {
                return;
            }
        });
        next();
    }

    // Auth Routes
    app.post("/mycart/api/signup", authController.signup);
    app.post("/mycart/api/login", authController.login);
    app.get("/mycart/api/user/:id/logout", loginAuth, authController.logout);

    // Product Routes
    app.get("/mycart/api/product/list", loginAuth, productController.list);
    app.get("/mycart/api/product/:id", loginAuth, productController.fetch);
    app.post("/mycart/api/product/add", loginAuth, productController.addProduct);

    // Customer Routes
    app.post("/mycart/api/user/:userid/addproduct/:productid", loginAuth, customerController.addCart);
    app.get("/mycart/api/user/:userid", loginAuth, customerController.fetch);


};