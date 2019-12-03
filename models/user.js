const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    PhoneNumber: {type: String, unique: true},
    password: {type: String, required: true, unique:true}
});

module.exports = mongoose.model('user', userSchema);