const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    date: String,
    status: Boolean,
    user_id: String,  
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
    
});

module.exports = mongoose.model('Order', RoomSchema);