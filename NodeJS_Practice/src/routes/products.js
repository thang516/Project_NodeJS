const express = require('express');
const router = express.Router();
const ProductController = require('../app/controllers/ProductController');
const upload = require('../util/UpLoad')
// const  middleware = require("../app/Middleware");
// router.put('/update/:id', upload.single('image'), ProductController.update)


// router.get("/home",middleware,ProductController.middleware);
router.get("/logout",ProductController.logout);

router.get('/login', ProductController.login);
router.get('/email', ProductController.email);
router.post('/authen', ProductController.authen);
router.get('/join', ProductController.list);
router.get('/create', ProductController.create);
router.get('/authentication', ProductController.Authentication);

router.post('/save', upload.single('image'),  ProductController.save);
router.get('/:id/edit', ProductController.edit);
router.put('/:id', ProductController.update);
router.patch('/:id/restore', ProductController.restore);
router.delete('/delete/:id', ProductController.delete);
router.get('/:slug', ProductController.show);



module.exports = router;
