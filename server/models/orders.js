const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    date: String,
    status: Boolean,
    user_id: String,  
    items_id: [String],
    items_count: [String]
});

module.exports = mongoose.model('Order', OrderSchema);