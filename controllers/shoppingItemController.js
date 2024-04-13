const item = require("./../models/item-model")

/**
 * Získá všechny produkty
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const list = async(req, res) => {
    try {
        const _items = await item.find({});
        if(_items.length === 0) {
            res.send({ message: 'Žádný produkt není vložený!'})
        }
        else {
            res.send(_items);
        }
    } catch (err) {
        res.status(500).send({ message: err});
    }
}
/**
 * Vrátí určitý produkt
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getItem = async(req, res) => {
    try {
        const {slug} = req.params
        const _item = await item.findOne({slug: slug});
        if(_item) {
            res.send(_item);
        }
        else {
            res.send({message: "Produkt nebyl nalezen :("})
        }
    } catch (err) {
        res.status(500).send({ message: err.errors });
    }
}
/**
 * Vytvoří nový produkt
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const createItem = async(req, res) => {
    try {
        const {content, count, state} = req.body
        const _item = await item.create({content, count, state});
        res.send(_item);
    } catch (err) {
        res.status(500).send({ message: err.errors });
    }
}
/**
 * Aktualizuje produkt
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const updateItem = async(req, res) => {

}
/**
 * Vymaže produkt
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteItem = async(req, res) => {

}
module.exports = {
    list, createItem, updateItem, deleteItem, getItem
}