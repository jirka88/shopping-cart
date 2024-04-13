const mongoose = require("mongoose");
const mongooseSlugPlugin = require('mongoose-slug-plugin');

const Schema = mongoose.Schema;
const itemSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Zadejte název!"]
        },
        count: {
            type: Number,
            default: 0
        },
        state: {
            type: String,
            required: [true, "Zadejte stav!"],
            enum: ["COMPLETE", "INCOMPLETE", "NONE"]
        },
    },
    {
        timestamps: true,
    },
);
itemSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=content%>'})
const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;