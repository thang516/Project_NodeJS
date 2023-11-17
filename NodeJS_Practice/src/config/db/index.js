const mongoose = require('mongoose');
const mysql = require('mysql2');
const connectDb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tonyadam56",
    database:"tess"
});

 async  function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/ducthang_dev');
        console.log('Connect-successfully!!!')
        connectDb.connect(function(err) {
            if (err){
                throw err;
            }else {
                console.log("Connected!");
            }
        });
    } catch (e) {
        console.log('Connect-fail !!!')

    }
}

module.exports = {connect,connectDb};


