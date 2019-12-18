const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    thematics: String,
    thematics_narrow: String,
    img: String
});

module.exports = mongoose.model('Item', ItemSchema);