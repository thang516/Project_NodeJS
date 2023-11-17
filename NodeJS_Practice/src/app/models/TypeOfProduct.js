const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeOfProduct = new Schema({
    name: {
        type: String,
    },
});

module.exports = mongoose.model('typeOfProduct', TypeOfProduct);
