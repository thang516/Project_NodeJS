const {multipleMongooseToObject} = require('../../util/mongoose')
const Product = require('../models/Product')

class SiteController {



storedProduct(req, res,next) {
    let perPage = 3; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.params.page || 1;

    Product.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((products) => {
            return Product.countDocuments().then((count) => {
                res.render('me/stored-product', {
                    products: multipleMongooseToObject(products),
                    current: page,
                    pages: Math.ceil(count / perPage)
                });
            });
        })
        .catch((err) => next(err));

    }

    trashProduct(req,res,next){
        Product.find({}).then(products => res.render('me/trash-product',{
            products:multipleMongooseToObject(products)
        }))
            .catch(next)
    }
}

module.exports = new SiteController();
