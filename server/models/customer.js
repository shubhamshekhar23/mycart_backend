const mongoose = require('mongoose');
const crypto = require('crypto');
Schema = mongoose.Schema;

const CustomerSchema = new mongoose.Schema({
    firstName: { type: String, required:true},
    lastName: { type: String, required:true },
    hashed_password: { type: String},
    email: { type: String,required:true, index: true },
    salt: String,
    cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    createdOn: { type: Date, default: Date.now(), required: true },
    updatedOn: { type: Date, default: Date.now(), required: true }
});

CustomerSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
})

CustomerSchema.methods = {
    authenticate: function(plainText) {
      return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
      if (!password) return ''
      try {
        return crypto
          .createHmac('sha1', this.salt)
          .update(password)
          .digest('hex')
      } catch (err) {
        return ''
      }
    },
    makeSalt: function() {
      return Math.round((new Date().valueOf() * Math.random())) + ''
    }
  }

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;