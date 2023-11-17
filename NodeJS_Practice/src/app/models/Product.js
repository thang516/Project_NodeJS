const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');

const Product = new Schema({
        name: {
            type: String, maxLength: 100, required: [true, "Cannot Be Left Blank"]
        },
        description: {
            type: String, maxLength: 600,
            required: [true, "Cannot Be Left Blank"]
        },
        image: {
            type: String ,
            required: [true, "Cannot Be Left Blank"]
        },
        videoId: {
            type: String, maxLength: 800,
            required: [true, "Cannot Be Left Blank"]
        },
        slug: {
            type: String, slug: 'name', unique: true,
            required: [true, "Cannot Be Left Blank"],
        },
        typeOfProduct: {type: Schema.Types.ObjectId, ref: 'typeOfProduct'}
    },
    {
        timestamps: true
    }
);

// Product.plugin(mongooseDelete)
module.exports = mongoose.model('Product', Product);