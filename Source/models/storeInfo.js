var mongosee = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongosee.Schema;

var storeInfo = new Schema({
    phoneNumb: String,
    address: String,
    email: String,
    name: String,
    date: Date,
    company: String
})

storeInfo.statics = {
    getAll() {
        return this.find({}).exec(); // find moi co exec
    },
    createNew(info) {
        return this.create(info)
    }
}


storeInfo.plugin(mongoosePaginate);
module.exports = mongosee.model('storeInfo', storeInfo);