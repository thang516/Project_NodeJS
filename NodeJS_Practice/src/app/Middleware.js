const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRETKEY;
const middleware ={
    verifyToken: (req, res, next) => {
        const token = req.cookies.Galip
        const generateAuthTokenResponse = jwt.decode(token, secretKey)
        console.log(token)

        // console.log(generateAuthTokenResponse)
        // console.log(req.originalUrl)
        if (token === undefined) {
            res.redirect('/products/login')
        } else {
            next();
        }
    }
}
module.exports = middleware;