const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const Schema = mongoose.Schema;
const itemSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Zadejte název!"]
        },
        slug: {
            type: String,
            slug: "content",
            unique: true,
            index: true
        },
        count: {
            type: Number,
            default: 0,
            min: [0, 'Počet kusů nesmí být záporný!']
        },
        state: {
            type: String,
            required: [true, "Zadejte možný stav!"],
            enum: ["complete", "incomplete", "none"]
        },
    },
    {
        timestamps: true,
    },
);
const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;