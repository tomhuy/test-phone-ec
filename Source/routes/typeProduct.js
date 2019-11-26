const express = require('express')
const typeProducts = express.Router()
const jwt = require('jsonwebtoken')
const cors = require("cors")
// const checkAdmin = require('../middlewares/checkRole');

// middleware custome
const { authenRole } = require('../middlewares/index');

const typeProduct = require("../models/typeProduct")
typeProducts.use(cors())

//check authentication 
typeProducts.use(authenRole.CheckStaff);

process.env.SECRET_KEY = 'huynbao'

//create type product
typeProducts.post('/create', (req, res) => {
    //create new instance
    var type = new typeProduct();
    type.name = req.body.name;
    type.no = req.body.no;
    type.alias = req.body.alias;
    //type.products=null;

    type.save((err) => {
        if (err) {
            if (err.code == 11000) {
                return res.json({ sucesss: false, message: 'this type of product already exists' })
            }
            else
                return res.send(err);
        }
        res.json({ message: 'type of product created' });
    })
})
// get all types product
typeProducts.post('/get', async (req, res) => {
    try {
       
        if (req.body.orderField) {
            let orderField = req.body.orderField;

            const options = {
                page: (req.body.pageIndex) ? req.body.pageIndex : 1,
                limit: (req.body.pageSize) ? req.body.pageSize : 50,
                sort: { [orderField]: (req.body.orderBy) ? req.body.orderBy : 'asc' }
            }

            // const types = await typeProduct.paginate({}, options);
            // return res.json(types);
            typeProduct.paginate({}, options, (err, type) => {
                res.json(type);
            })
        }
        else {
            const options = {
                page: (req.body.pageIndex) ? req.body.pageIndex : 1,
                limit: (req.body.pageSize) ? req.body.pageSize : 50
            };
            // const types = await typeProduct.paginate({}, options);
            // return res.json(types);
            typeProduct.paginate({}, options, (err, type) => {
                res.json(type);
            })
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }

})

typeProducts.post('/test', (req, res) => {
    try {
        const options = {
            page: (req.body.pageIndex) ? req.body.pageIndex : 1,
            limit: (req.body.pageSize) ? req.body.pageSize : 50
            // orderField: (req.body.orderField) ? req.body.orderField : "name",
            // orderBy: (req.body.orderBy) ? req.body.orderBy : "asc"
        };
        typeProduct.find()
            .limit(options.limit)
            .skip(options.limit * options.page)
            // .sort({
            //     [options.orderField]: options.orderBy
            // })
            .exec((err, type) => {
                if (err) console.log(err);
                typeProduct.count().exec((err, count) => {
                    if (err) console.log(err);
                    res.json({ "docs": type, "totalDocs": count, "totalPages": count / options.limit });
                })
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
})



//on routes end at /typeproduct/:typeproduct_id
typeProducts.route('/:typeproduct_id')
    //get the type product with id
    .get((req, res) => {
        typeProduct.findById(req.params.typeproduct_id, function (err, type) {
            if (err) return res.send(err);

            //return that type product
            res.json(type);
        })
    })
    .put((req, res) => {
        typeProduct.findById(req.params.typeproduct_id, (err, type) => {
            if (err) return res.send(err);

            //set the new type of product if it exists in the request 
            if (req.body.name) type.name = req.body.name;
            if (req.body.no) type.no = req.body.no;
            if (req.body.alias) type.alias = req.body.alias;

            //save the product
            type.save(err => {
                if (err) return res.send(err);

                //return a message 
                res.json({ message: 'type of product updated' })
            })
        })
    })
    .delete((req, res) => {
        typeProduct.remove({
            _id: req.params.typeproduct_id
        }, err => {
            if (err) return res.send(err)
            res.json({ message: 'successfully deleted' })
        })
    })

module.exports = typeProducts;


