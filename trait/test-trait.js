const mongoose = require('mongoose');
const Item = require("../models/item-model");

const getItem = async(par) => {
    return Item.findOne({slug: par});
}
module.exports = {getItem}