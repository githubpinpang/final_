const mongoose = require('mongoose');
const User = require('./user');

const schema = mongoose.Schema;
const user = new User();

const textSchema = mongoose.Schema({
   // _id: mongoose.Schema.Types.ObjectId,
    sender: {type: String },
    receiver: {type:String},
    Message: {type: String, unique: true}
   /* userRef: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    }

*/

});
module.exports = mongoose.model('text', textSchema);