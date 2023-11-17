const {multipleMongooseToObject} = require('../../util/mongoose')
const Product = require('../models/Product')

class SiteController {

    // [GET] /
    index(req, res, next) {

        // Product.find().then((products,err) => {
        //     if(!err){
        //         res.json(products);
        //     } else {
        //         next(err)
        //     }
        // })
        // dung promise

        // Product.find({}).then(products => {
        //     res.render('home', {
        //         products: multipleMongooseToObject(products)
        //     })
        // })
        //
        //     .catch(error => next(error))

                return res.render('homepage');

    }
    list(req,res,next){
        Product.find({}).then(products => {
            res.render('home', {
                products: multipleMongooseToObject(products)
            })
        })

            .catch(error => next(error))
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
