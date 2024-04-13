var express = require('express');
var router = express.Router();
const shoppingController = require('./../controllers/shoppingItemController')

router.get('/', shoppingController.list);
router.post('/create', shoppingController.create)

module.exports = router;
