const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/product/:page', meController.storedProduct);
router.get('/trash/product', meController.trashProduct);


module.exports = router;
