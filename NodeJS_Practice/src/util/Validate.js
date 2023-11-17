
const {check} = require('express-validator');
 function Validate(userData) {

     let validateProduct = () => {
         return [
             check('product.name', 'username does not Empty').not().isEmpty(),
             check('product.description', 'username must be Alphanumeric').isAlphanumeric(),
             check('product.image', 'username more than 6 degits').isLength({ min: 6 }),
             check('product.videoId', 'Invalid does not Empty').not().isEmpty(),
             check('product.slug', 'Invalid email').isEmail(),
         ];
     }

     let validate = {
         validateRegisterUser: validateProduct,
     };
    //
    //     const errors = {};
    //
    //     if (!userData.name) {
    //         errors.name = 'Username không được để trống';
    //     }
    //     if (!userData.description) {
    //      errors.description = 'Username không được để trống';
    //  }
    //     if (!userData.image) {
    //         errors.image = 'Email không được để trống';
    //     }
    //
    //     if (!userData.videoId) {
    //         errors.videoId = 'Password không được để trống';
    //     }
    // if (!userData.slug) {
    //     errors.slug = 'Password không được để trống';
    // }
    //
    //     return errors;
    // }
    //
    //
    // const userData = {
    //     name: '',
    //     description: '',
    //     image: '',
    //     videoId:"",
    //     slug :"",
    //
    // };
    //
    // const errors = Validate(userData);
    //
    // if (Object.keys(errors).length === 0) {
    //     console.log('Dữ liệu hợp lệ');
    // } else {
    //     console.error('Dữ liệu không hợp lệ:', errors);
}
    module.exports = {validate}