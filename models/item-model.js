const mongoose = require('mongoose')
var slug = require('mongoose-slug-updater')
mongoose.set('runValidators', true)
mongoose.plugin(slug)
const states = require('./../enum/stateEnum')

const Schema = mongoose.Schema
const itemSchema = mongoose.Schema(
   {
      content: {
         type: String,
         required: [true, 'Zadejte název!'],
      },
      slug: {
         type: String,
         slug: 'content',
         unique: true,
         index: true,
      },
      count: {
         type: Number,
         default: 1,
         min: [1, 'Počet kusů nesmí být záporný ani nula!'],
      },
      state: {
         type: String,
         required: [true, 'Zadejte možný stav!'],
         enum: states,
      },
   },
   {
      timestamps: true,
   },
)
const ItemModel = mongoose.model('Item', itemSchema)

module.exports = ItemModel
