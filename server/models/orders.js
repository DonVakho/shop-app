const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    date: String,
    status: Boolean,
    user_id: String,
    items: [{
        item_id: String,
        count: Number
    }]
});

module.exports = mongoose.model('Order', OrderSchema);