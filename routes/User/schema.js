const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id:Number,
    firstName: String,
    lastName: String,
    email: {type:String,unique:true}

}, {timestamps: true});
module.exports = mongoose.model('Users', userSchema);
