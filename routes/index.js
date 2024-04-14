var express = require('express');
var router = express.Router();
const shoppingController = require('./../controllers/shoppingItemController')

router.get('/list', shoppingController.list);
router.get('/list/:slug', shoppingController.getItem)
router.post('/create', shoppingController.createItem);
router.put('/update/:slug', shoppingController.updateItem);
router.delete('/delete/:slug', shoppingController.deleteItem)

module.exports = router;
