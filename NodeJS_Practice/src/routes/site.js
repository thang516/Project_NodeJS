const express = require('express');
const router = express.Router();
const middleware = require('../app/Middleware')
const siteController = require('../app/controllers/SiteController')
// router.get('/', siteController.index);
router.get('/list',middleware.verifyToken , siteController.list);
router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;
