var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;
var ObjectId= Schema.Types.ObjectId;
// mongoose.Promise=global.Promise;

var typeProductSchema= new Schema({
    name: {type:String,required:true,index:{unique:true}},
    no: Number, // number order on menu
    alias:String,
    products: [{ type: ObjectId, ref: 'Product'}],
})

typeProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('typeproduct',typeProductSchema);