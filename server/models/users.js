const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    surname: String,
    password: String,
    geo_id: String,
    address: String,
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
});

module.exports = mongoose.model('User', UserSchema);