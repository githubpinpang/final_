const mongoose = require('mongoose');

const schema = mongoose.Schema;
const User = require('./user');

const user = new User();

const callSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    caller: {type: String},
    callDate: {type: Date, default: Date.now, unique: true}
   /* userRef: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    }*/

});

module.exports = mongoose.model('call', callSchema);