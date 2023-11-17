
module.exports = {

    // su ly array truoc

    multipleMongooseToObject : function (mongooses) {
        return mongooses.map(mongooses => mongooses.toObject());
    },
    // su ly chi co 1 doi tuong
    mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
    }



}