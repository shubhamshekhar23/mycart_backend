const mongoose = require('mongoose');
Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    name: {type: String, required:true},
    price: {type: Number, required:true},
    imageUrl: {type: String, required:true},
    description: {type: String, required:true},
    manufacturedBy: {type: String, required:true},
    createdOn:{type:Date, default:Date.now(),required:true},
    updatedOn:{type:Date, default:Date.now(),required:true}
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;