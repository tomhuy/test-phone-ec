var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;
var ObjectId= Schema.Types.ObjectId;

// var phoneInfoSchema = new Schema({
//     screenSize: String,
//     frontCam: String,
//     backCam: String,
//     cpu: String,
//     ram: String,
//     storageCapacity: String,
//     memoryCard: String,
//     sim: String,
//     os: String,
// })

var productSchema = new Schema({
    name: String,
    price: {type: Number, required:true},
    promotion: Number,
    phoneInfo: {
        screenSize: String,
        frontCam: String,
        backCam: String,
        cpu: String,
        ram: String,
        storageCapacity: String,
        memoryCard: String,
        sim: String,
        os: String,
    },
    typeProduct: { type: ObjectId, ref: 'typeproduct'},
    brand: { type: ObjectId, ref: 'brand'},
    imagePaths: Array,
    quantity:Number,
    description:String,
    alias:String
});

productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Product',productSchema);