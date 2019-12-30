const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    description: [{key: String, value: String}],
    price: Number,
    category: String,
    thematics: String,
    thematics_narrow: String,
    img: String,
    stock: [{
        option: String,
        left: Number
    }]
});

module.exports = mongoose.model('Item', ItemSchema);