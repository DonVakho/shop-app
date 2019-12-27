const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilterSchema = new Schema({
    categories: [String],
    thematics: [String],
    thematics_narrow: [{
        key: String,
        values: [String]
    }],
    high_price: Number

});

module.exports = mongoose.model('Filter', FilterSchema);