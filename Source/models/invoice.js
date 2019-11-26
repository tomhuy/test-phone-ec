var mongosee = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongosee.Schema;

var invoiceSchema = new Schema({
    code: { type: String, required: true },
    receiver: { type: String, required: true },
    address: { type: String, required: true },
    note: String,
    phoneNumber: { type: String, required: true },
    products: { type: Array, required: false },
    state: {
        type: String,
        enum: ['Sent', 'Approved', 'Delivering', 'Closed'],
        required: true,
        default: 'Sent'
    },
    typeOfPayment: {
        type: String,
        enum: ['COD', 'paypal'],
        required: true,
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    }
})


invoiceSchema.plugin(mongoosePaginate);
module.exports = mongosee.model('Invoice', invoiceSchema);