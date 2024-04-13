const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const itemSchema = new Schema({
    name: String,
    country: String,
    year: Number
});

const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;