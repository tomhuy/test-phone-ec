var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
//

var staffSchema = new Schema({
    name: String,
    username: { type: String, required: true, index:{ unique:true}},
    password: { type: String, required: true},
    role: {
        type: String,
        enum: ['staff','admin'],
        required: true
    },
    email: String,
    avatar: String,
    dateOfBirth: Date,
    gender: Boolean
});


//
staffSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Staff', staffSchema);