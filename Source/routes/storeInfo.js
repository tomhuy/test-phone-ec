const express = require('express')
const router = express.Router()
const cors = require("cors")
const { storeInfo } = require('../controllers/index');

const Info = require("../models/storeInfo")
router.use(cors())

//create info
// router.post('/', storeInfo.createNewInstance)
// router.get('/',storeInfo.getAllInfo);
router.route('/')
    .post(storeInfo.createNewInstance)
    .get(storeInfo.getAllInfo)
    
// router.route('/')
//     .post((req, res) => {
//         //create new instance
//         var info = new Info();
//         info.phoneNumb = req.body.phoneNumb;
//         info.address = req.body.address;
//         info.email = req.body.email;
//         info.name = req.body.name;
//         info.date = new Date(req.body.date);
//         info.company = req.body.company;

//         info.save((err) => {
//             if (err) {
//                 if (err.code == 11000) {
//                     return res.json({ sucesss: false, message: 'this info already exists' })
//                 }
//                 else
//                     return res.send(err);
//             }
//             res.json({ message: 'Info Added' });
//         })
//     })
//     // get all types product
//     .get((req, res) => {
//         Info.find((err, info) => {
//             if (err) return res.send(err);

//             //return the types
//             res.json(info);
//         })
//     })
//on routes end at /:info_id
router.route('/:info_id')
    .get((req, res) => {
        Info.findById(req.params.info_id, function (err, info) {
            if (err) return res.send(err);

            //return that type product
            res.json(info);
        })
    })
    .put((req, res) => {
        Info.findById(req.params.info_id, (err, info) => {
            if (err) return res.send(err);

            //set the new type of product if it exists in the request 
            if (req.body.phoneNumb) info.phoneNumb = req.body.phoneNumb;
            if (req.body.address) info.address = req.body.address;
            if (req.body.email) info.email = req.body.email;
            if (req.body.name) info.name = req.body.name;
            if (req.body.date) info.date = req.body.date;
            if (req.body.company) info.company = req.body.company;

            //save the product
            info.save(err => {
                if (err) return res.send(err);

                //return a message 
                res.json({ message: 'this info updated' })
            })
        })
    })
    .delete((req, res) => {
        Info.remove({
            _id: req.params.info_id
        }, err => {
            if (err) return res.send(err)
            res.json({ message: 'successfully deleted' })
        })
    })

module.exports = router;


