const item = require('./../models/item-model')
const Filter = require('../components/Filter')
/**
 * Získá všechny produkty
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const list = async (req, res) => {
  try {
    const filter = new Filter()
    const query = filter.getQuery(req)
    const _items = await item.find(query)
    if (_items.length === 0) {
      res.status(400).send({ message: 'Žádný produkt nebyl nalezen!' })
    } else {
      res.send(_items)
    }
  } catch (err) {
    res.status(500).send({ message: err })
  }
}
/**
 * Vrátí určitý produkt
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getItem = async (req, res) => {
  try {
    const slug = req.params.slug
    const _item = await item.findOne({ slug: slug })
    if (_item) {
      res.send(_item)
    } else {
      res.status(400).send({ message: 'Produkt nebyl nalezen :(' })
    }
  } catch (err) {
    res.status(500).send({ message: err.errors })
  }
}
/**
 * Vytvoří nový produkt
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const createItem = async (req, res) => {
  try {
    req.body.state = req.body.state.toUpperCase()
    const { content, count, state } = req.body
    const _item = await item.create({ content, count, state })
    res.send(_item)
  } catch (err) {
    res.status(400).send({ message: err.errors })
  }
}
/**
 * Aktualizuje produkt
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const updateItem = async (req, res) => {
  try {
    req.body.state = req.body.state.toUpperCase()
    const { content, count, state } = req.body
    const _item = await item.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: { content: content, count: count, state: state } },
      { new: true },
    )
    if (_item) {
      res.send(_item)
    } else {
      res.status(400).send({ message: 'Produkt nebyl nalezen!' })
    }
  } catch (err) {
    res.status(400).send({ message: err.errors })
  }
}
/**
 * Vymaže produkt
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteItem = async (req, res) => {
  try {
    const _item = await item.findOneAndDelete({ slug: req.params.slug })
    if (_item === null) {
      res.status(400).send({ message: 'Položka nebyla nalezena!' })
    } else {
      res.send({ message: 'Produkt byl úspěšně vymazán!' })
    }
  } catch (err) {
    res.status(500).send({ message: err.errors })
  }
}
module.exports = {
  list,
  createItem,
  updateItem,
  deleteItem,
  getItem,
}
