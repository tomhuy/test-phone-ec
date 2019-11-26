const express = require('express')
const Invoices = express.Router()
const nodemailer = require("nodemailer");
const cors = require("cors")
const Product = require("../models/product")
const Invoice = require("../models/invoice")
// const {mailService} = require("../services/mailService.js")

Invoices.use(cors())

//create invoice
Invoices.post('/create', async (req, res) => {
    //create new instance
    var inv = new Invoice();

    inv.code = await generateCode();
    inv.receiver = req.body.receiver;
    inv.address = req.body.address;
    inv.note = req.body.note;
    inv.phoneNumber = req.body.phoneNumber;
    inv.products = req.body.products;
    // inv.state = req.body.state;
    inv.typeOfPayment = req.body.typeOfPayment;

    inv.save((err) => {
        if (err) {
            return res.send(err);
        }
        inv.products.forEach(proOrdered => {
            Product.findById({ _id: proOrdered.product._id }, function (err, pro) {
                //if (err) console.log(err);
                pro.quantity = pro.quantity - proOrdered.quantity;
                Product.findByIdAndUpdate({ _id: pro._id }, pro, err => {
                    //console.log(err);
                })
            })
        });
        res.json({ message: 'Invoice created' });
    })
})

let generateCode = () => {
    var code = 'BH' + Math.floor(Math.random() * 100000);
    return code;
}
// get all invoice
Invoices.post('/get', async (req, res) => {
    try {
        if (req.body.orderField) {
            let orderField = req.body.orderField;

            const options = {
                page: req.body.pageIndex,
                limit: req.body.pageSize,
                sort: { [orderField]: (req.body.orderBy) ? req.body.orderBy : 'asc' }
            }

            const invoices = await Invoice.paginate({}, options);
            return res.json(invoices);
        }
        else {
            const options = {
                page: (req.body.pageIndex) ? req.body.pageIndex : 1,
                limit: (req.body.pageSize) ? req.body.pageSize : 100
            };
            // const invoices = await Invoice.paginate({}, options);
            // return res.json(invoices);
            Invoice.find({ state: req.body.status }).then(async data => {
                var inv = await PaginatorArray(data, options.page, options.limit);
                res.json({ "docs": inv.data, "totalDocs": inv.total, "totalPages": inv.total_pages });
            }).catch(err => {
                console.log(err)
            })
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
})

function PaginatorArray(items, page, per_page) {

    var page = page,
        per_page = per_page,
        offset = (page - 1) * per_page,

        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}
//===BEGIN Filter

//by state
Invoices.get('/filterByState', (req, res) => {

    var state = req.body.state;

    Invoice.find({ state: state }, function (err, inv) {
        if (err) console.log(err);

        res.json(inv);
    })
})
//by type of payment 
Invoices.get('/filterByState', (req, res) => {

    var typeOfPayment = req.body.typeOfPayment;

    Invoice.find({ state: typeOfPayment }, function (err, inv) {
        if (err) console.log(err);

        res.json(inv);
    })
})
//by range date
Invoices.get('/filterByState', (req, res) => {

    // var startDate= new Date('2019-08-17T03:24:00');
    // console.log(startDate);
    // var endDate= new Date('2019-10-17T03:24:00');
    // var endDate;
    // var startDate = req.body.startDate;
    // if (req.body.endDate) {
    //     endDate = req.body.endDate;
    // }
    // else {
    //     endDate = Date.now();
    // }
    // console.log("date: "+ startDate+", "+endDate);

    Invoice.find({
        dateOrdered: {
            $gte: new Date(2019, 08, 19),
            $lte: new Date(2019, 10, 19)
        }
    }, function (err, inv) {
        if (err) console.log(err);

        res.json(inv);
    })
})
//===END Filter
Invoices.post('/testmail', async (req, res) => {
    let code = await req.body.code;
    let products = await req.body.products;
    let name = await req.body.name;
    let date= Date.now();
    let htmldynamic = '';
    await products.forEach(pro => {
        htmldynamic += `<tr><td><b>${pro.product.name}</b></td><td><b>${pro.quantity}</b></td><td><b>${pro.product.price}</b></td></tr>`
    })
    
    // step 1 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'auto.system.service.bao@gmail.com',
            pass: '@phuocbao98',
        }
    });

    // // step 2
    let mailOptions = {
        from: 'auto.system.service.bao@gmail.com',
        to: 'lamvunhi.work@gmail.com',
        subject: 'Thế giới di động B&H',
        html: `<html> <head> <style>.banner-color{background-color: #eb681f;}.title-color{color: #0066cc;}.button-color{background-color: #0066cc;}.tabledetail td, th{width:100%; border: 1px solid black; text-align: center;}@media screen and (min-width: 500px){.banner-color{background-color: #0066cc;}.title-color{color: #eb681f;}.button-color{background-color: #eb681f;}}</style> </head> <body> <div style="background-color:#ececec;padding:0;margin:0 auto;font-weight:200;width:100%!important"> <table align="center" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center"> <center style="width:100%"> <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;max-width:512px;font-weight:200;width:inherit;font-family:Helvetica,Arial,sans-serif" width="512"> <tbody> <tr> <td bgcolor="#F3F3F3" width="100%" style="background-color:#f3f3f3;padding:12px;border-bottom:1px solid #ececec"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;width:100%!important;font-family:Helvetica,Arial,sans-serif;min-width:100%!important" width="100%"> <tbody> <tr> <td align="left" valign="middle" width="50%"><span style="margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px">B&H Company</span></td><td valign="middle" width="50%" align="right" style="padding:0 0 0 10px"><span style="margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px">${date}</span></td><td width="1">&nbsp;</td></tr></tbody> </table> </td></tr><tr> <td align="left"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td width="100%"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center" bgcolor="#8BC34A" style="padding:20px 48px;color:#ffffff" class="banner-color"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center" width="100%"> <h1 style="padding:0;margin:0;color:#ffffff;font-weight:500;font-size:20px;line-height:24px">Automatic Electronic Bill</h1> </td></tr></tbody> </table> </td></tr><tr> <td align="center" style="padding:20px 0 10px 0"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center" width="100%" style="padding: 0 15px;text-align: justify;color: rgb(76, 76, 76);font-size: 12px;line-height: 18px;"> <h3 style="font-weight: 600; padding: 0px; margin: 0px; font-size: 16px; line-height: 24px; text-align: center;" class="title-color">Hi ${name},</h3> <p style="margin: 20px 0 30px 0;font-size: 15px;text-align: center;">Thanks for purchase at our shop. Here is your bill:</p><h3 style="color: green;font-weight: 600; padding: 0px; margin: 0px; font-size: 13px; line-height: 36px; text-align: center;" class="title-color">Invoice Code:  ${code}</h3> <table class="tabledetail"> <tr> <th><i>Product</i></th> <th><i>Quantity</i></th> <th>Price</th> </tr>${htmldynamic}</table> <div style="font-weight: 200; text-align: center; margin: 25px;"><a style="padding:0.6em 1em;border-radius:600px;color:#ffffff;font-size:14px;text-decoration:none;font-weight:bold" class="button-color">Check order status here</a></div></td></tr></tbody> </table> </td></tr><tr> </tr><tr> </tr></tbody> </table> </td></tr></tbody> </table> </td></tr><tr> <td align="left"> <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="padding:0 24px;color:#999999;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center" width="100%"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center" valign="middle" width="100%" style="border-top:1px solid #d9d9d9;padding:12px 0px 20px 0px;text-align:center;color:#4c4c4c;font-weight:200;font-size:12px;line-height:18px">Regards, <br><b>Bao Huy shop</b> </td></tr></tbody> </table> </td></tr><tr> <td align="center" width="100%"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center" style="padding:0 0 8px 0" width="100%"></td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </center> </td></tr></tbody> </table> </div></body></html>`
    };

    // // Step 3

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Mail sent');
        }
    });

})

//on routes end at /:invoice_id
Invoices.route('/:invoice_id')
    //get the type product with id
    .get((req, res) => {
        Invoice.findById(req.params.invoice_id, function (err, inv) {
            if (err) return res.send(err);

            //return that invoice
            res.json(inv);
        })
    })
    .put((req, res) => {
        Invoice.findByIdAndUpdate(req.params.invoice_id, { $set: { state: req.body.state } }, (err, inv) => {
            if (err) return res.send(err);
            // console.log('updated')
        })
    })
// .delete((req,res)=>{
//     typeProduct.remove({
//         _id:req.params.typeproduct_id
//     }, err=>{
//         if(err) return res.send(err)
//         res.json({message:'successfully deleted'})
//     })
// })

module.exports = Invoices;


