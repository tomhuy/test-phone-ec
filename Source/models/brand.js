var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;
var ObjectId= Schema.Types.ObjectId;
// mongoose.Promise=global.Promise;

var brandSchema= new Schema({
    name: {type:String,required:true,index:{unique:true}},
    no: Number, // number order on menu
    alias:String,
    products: [{ type: ObjectId, ref: 'Product'}],
})

brandSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('brand',brandSchema);