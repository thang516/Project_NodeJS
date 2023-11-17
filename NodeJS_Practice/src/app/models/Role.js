
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = new Schema({
           name_role: {
             type: String,
}
});

module.exports = mongoose.model('Role', Role);
