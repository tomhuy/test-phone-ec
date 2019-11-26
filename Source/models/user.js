const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
//
const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: { type: String, required:true, index:{unique:true}},
    password: { type: String, required: true},
    address: String,
    phoneNumber: Number,
    gender: Boolean,
    birthDay: Date,
    date:{type:Date,default:Date.now()}
});
//
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('users', UserSchema);