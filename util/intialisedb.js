const mongoose = require('mongoose');
const dummy = require('mongoose-dummy');
const Product = require('../server/models/product')

let schemaobj = {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    manufacturedBy: { type: String, required: true },
    createdOn: { type: Date, default: Date.now(), required: true },
    updatedOn: { type: Date, default: Date.now(), required: true }
};

let schemaDefinition = new mongoose.Schema({
    productlist: [schemaobj]
});
let model = mongoose.model('ProductDummy', schemaDefinition);
module.exports = () => {
    let countNew = 0;
    Product.count({}, function (err, count) {
        console.log("Number of products:", count);
        if (count == 0) {
            for (let i = 0; i < 10; i++) {
                let randomObject = dummy(model, {
                    returnDate: true
                })
                count = count + randomObject.productlist.length;
                let t = Product.insertMany(randomObject.productlist, function (error, docs) { });
            }
            console.log(countNew + " records inserted in Product Collection in Mongodb")
        } else {
            console.log("Product Collection in Mongodb already have some data")
        }
    })
}
// console.log(randomObject);
