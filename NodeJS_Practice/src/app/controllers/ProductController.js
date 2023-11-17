
const Product = require('../models/Product')
const TypeOfProduct = require('../models/TypeOfProduct')
const {mongooseToObject} = require('../../util/mongoose')
const {multipleMongooseToObject} = require("../../util/mongoose");
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const secretKey = 'galip';
const nodemailer = require('nodemailer');
const Swal = require('sweetalert2');

class SiteController {

    logout(req, res, next) {
        res.clearCookie("Galip");
        res.redirect("/");
    }

    email(req, res, next) {

        const option = {
            service: 'gmail',
            auth: {
                user: 'kguardshop28@gmail.com',
                pass: 'szgxifnnrraksitm'
            }
        };
        const transporter = nodemailer.createTransport(option);
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else { //Nếu thành công.
                // return res.redirect('/');
                console.log('Kết nối thành công!');
            }
        });
        const mail = {
            from: 'kguardshop28@gmail.com', // Địa chỉ email của người gửi
            to: 'nguyenthangfa2001@gmail.com', // Địa chỉ email của người gửi
            subject: 'Thư được gửi bằng Node.js', // Tiêu đề mail
            text: 'A` Nhon Xe Ohh ~.~ ', // Nội dung mail dạng text
            html: '<h1>Hii</h1>' +
                '<p> ~@ . @~</p>' +
                '<p>Chúc bạn 1 ngày tốt lành ! ~ ! ~ !</p>' +
                '<h3>gg</h3>' +
                '<p>Best Good For Luck</p> ' // Nội dung mail dạng html

        };

        transporter.sendMail(mail, function (error, info) {
            if (error) { // nếu có lỗi
                console.log(error);
            } else { //nếu thành công
                console.log('Email sent: ' + info.response);
            }
        });
    }


    login(req, res, next) {
        res.render("products/login")
    }

    authen(req, res) {
        // {username: req.body.username, password: req.body.password}
        // {_id: "6542044dfaf8b147e02e05a7"}
        let u = req.body.username;
        let p = req.body.password;
        let messages = "Login Fail"
        let mess = "Login successfully"
        User.findOne({username: req.body.username, password: req.body.password})

            .then(user => {
                if (!user) {

                    return res.render('products/login',{
                        messages
                    });
                }

                const payload = {
                    id: user._id,
                    username: user.username
                };
                const option = {expiresIn: '1d'};
                const token = jwt.sign(payload, secretKey, option);
                const decoded = jwt.verify(token, secretKey);

                console.log(user)
                const nameCookie = 'Galip';
                //valueCookie: giá trị sẽ lưu vào name cookie, ở đây chúng ta sẽ sẽ lưu giá trị token được tạo bởi jwt
                const valueCookie = token;
                //timeExpiresIn: thời gian sống của cookie, chúng ta sẽ lưu thời gian của cookie bằng với thời gian của mã token được tạo bởi jwt nhé
                // vì thời gian của cookie tính bằng ms nên chúng ta phải quy đổi lại nhé (60 * 60 * 1000 * 24) cú pháp đổi ms -> 1 ngày
                // ở đây chúng ta tạo token là 3650 ngày nên cần nhân thêm 3650
                const timeExpiresIn = 60 * 60 * 1000;
                res.cookie(nameCookie, valueCookie, {maxAge: timeExpiresIn})
                const cookie = req.cookies.token
                console.log(cookie)
                // res.send("Token: " + token)
                return res.redirect('/');
            })
            .catch(err =>  {
                // return res.render('/product/login',{
                //     err
                // })
                console.log(err)
            })


    }

    Authentication(req, res) {

//ví dụ có 1 danh sách user như sau
        const listUser = [

            {
                id: 2,
                email: 'ta@gmail.com',
                password: '1',
            },
        ];
// tạo một mã định danh cho user có id=1 bằng cách như sau
// ở đây chúng ta chỉ cần giá trị id của user vì id là duy nhất, từ id chúng ta có thể tìm được thông tin của user
//payload: giá trị cần mã hóa
        const payload = {
            id: listUser[0].id,
        };
//secretKey: khóa bí mật, bạn có thể đặt bất kì mã gì cũng được
        const secretKey = 'galip';
//option: giá trị này có thể có hoặc không đều được, ví dụ ở đây mình sẽ xét thời gian của mã token là 1 ngày nhé
//giá trị 1d có thể thay đổi bằng giá trị khác ví dụ '1h' (1 giờ), "60" (60ms),...
        const option = {expiresIn: '1d'};
        const token = jwt.sign(payload, secretKey, option);
//mỗi lần chạy thì sẽ tạo ra một token nhé, do vậy bạn không cần phải lo lắng, dù có cùng giá trị payload, secretKey đi chăng nữa
//điều này giúp bảo mật cho website chúng ta hơn
        console.log("token -------------" + token.username);
        /*
        * var jwt = require('jsonwebtoken');
// giải mã cần có khóa bí mật trùng với khóa bí mật khi tạo token nhé
var secretKey = 'tek4vn';
//giá trị token các bạn copy token đoạn vừa tạo vào biến này nhé
var token =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMyNjE3ODEwLCJleHAiOjE2MzI3MDQyMTB9.hUFVlHliTqzLPvwnVCKH9i4mQX5CP6CMEUndFynvAxE';
var decoded = jwt.verify(token, secretKey);
console.log(decoded);
//khi giải mã thành công bạn sẽ thấy giá trị đã mã hóa và thời gian sống của token

        *
        * */
        const nameCookie = 'Galip';
        //valueCookie: giá trị sẽ lưu vào name cookie, ở đây chúng ta sẽ sẽ lưu giá trị token được tạo bởi jwt
        const valueCookie = token;
        //timeExpiresIn: thời gian sống của cookie, chúng ta sẽ lưu thời gian của cookie bằng với thời gian của mã token được tạo bởi jwt nhé
        // vì thời gian của cookie tính bằng ms nên chúng ta phải quy đổi lại nhé (60 * 60 * 1000 * 24) cú pháp đổi ms -> 1 ngày
        // ở đây chúng ta tạo token là 3650 ngày nên cần nhân thêm 3650
        const timeExpiresIn = 60 * 60 * 1000 * 24 * 3650;
        res.cookie(nameCookie, valueCookie, {maxAge: timeExpiresIn});
        return res.redirect('/');

    }


    list(req, res, next) {
        Product.find()
            .populate('typeOfProduct')
            .exec()
            .then((product) => {
                res.json({
                    product: multipleMongooseToObject(product)
                })
                // console.log(product.typeOfProduct.name)

            })
            .catch((err) =>
                console.log('TEST JOIN  FAIL' + err)
            )
    }


    // [GET] /products/:slug
    show(req, res, next) {
        Product.findOne({slug: req.params.slug})
            .then(product => {
                res.render('products/show', {product: mongooseToObject(product)})
            }).catch(next);

    }

    // GET products/create
    create(req, res) {
        res.render('products/create')
    }

    //POST products/save
    save(req, res) {
        // req.body.image = req.file ? req.file.filename : ''
        // const  image = req.file ? req.file.filename : '';
        // console.log(image);
        const product = new Product(req.body);
        // const error = validationResult(req);
        // if (!error.isEmpty()) {
        //     res.status(422).json({ errors: error.array() });
        //     return;
        // }
        product.save()
            .then(() => res.redirect(`/list`))
            .catch((error) => {
                if (error) {
                    const validationErrors = [];
                    for (const field in error.errors) {
                        validationErrors[field] = error.errors[field].message
                    }
                    console.error('Lỗi validation:', validationErrors);
                    res.render('products/create', {error: validationErrors})
                } else {
                    console.error('Lỗi khác:', error);
                    res.status(500).send('Đã xảy ra lỗi trong quá trình lưu dữ liệu');
                }
                // const errors= validationResult(req);
                // if (errors) {
                //     res.render('products/create', {error: validationResult(req)})
                //     return;
                // }
            });

        // res.send('SAVE SCF !!!')
    }


    // GET products/:id/edit
    edit(req, res, next) {
        Product.findById(req.params.id)
            .then(product => res.render('products/edit', {
                product: mongooseToObject(product)
            }))
            .catch(next)
    }

    //POST products/save
    async update(req, res, next) {

        Product.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/product'))
            .catch(next);
    }

    delete(req, res, next) {
        Product.find({deleteAt: null})
        Product.deleteOne({_id: req.params.id})
            .then(() => res.redirect('/me/stored/product'))
            .catch(next);
    }

    restore(req, res, next) {
        Product.find({deleteAt: null})
        Product.deleteOne({_id: req.params.id})
            .then(() => res.redirect('/me/stored/product'))
            .catch(next);
    }


    // Trong controller dùng 
    middleware(req, res, next) {
        console.log("middleware success !!")
    }
}

module
    .exports = new SiteController();
