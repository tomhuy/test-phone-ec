const express = require('express')
const brands = express.Router()
const cors = require("cors")

const brand = require("../models/brand")
brands.use(cors())


brands.post('/create',(req, res) => {
    //create new instance
    var br = new brand();
    br.name = req.body.name;
    br.no = req.body.no;
    br.alias = req.body.alias;

    br.save((err) => {
        if (err) {
            if (err.code == 11000) {
                return res.json({ sucesss: false, message: 'this brand already exists' })
            }
            else
                return res.send(err);
        }
        res.json({ message: 'brand created' });
    })
})

// get all brands 
brands.post('/get',async (req, res) => {
    try {
        if (req.body.orderField) {
            let orderField = req.body.orderField;

            const options = {
                page: req.body.pageIndex,
                limit: req.body.pageSize,
                sort: { [orderField]: (req.body.orderBy) ? req.body.orderBy : 'asc' }
            }

            const br= await brand.paginate({}, options);
            return res.json(br);
        }
        else {
            const options = {
                page: (req.body.pageIndex) ? req.body.pageIndex : 1,
                limit: (req.body.pageSize) ? req.body.pageSize : 50
            };
            const br= await brand.paginate({}, options);
            return res.json(br);
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }

})

brands.route('/:brand_id')
    .get((req, res) => {
        brand.findById(req.params.brand_id, function (err, brand) {
            if (err) return res.send(err);
            res.json(brand);
        })
    })
    .put((req, res) => {
        brand.findById(req.params.brand_id, (err, brand) => {
            if (err) return res.send(err);

            
            if (req.body.name) brand.name = req.body.name;
            if (req.body.no) brand.no = req.body.no;
            if (req.body.alias) brand.alias = req.body.alias;

            brand.save(err => {
                if (err) return res.send(err);

                //return a message 
                res.json({ message: 'brand updated' })
            })
        })
    })
    .delete((req, res) => {
        brand.remove({
            _id: req.params.brand_id
        }, err => {
            if (err) return res.send(err)
            res.json({ message: 'successfully deleted' })
        })
    })


module.exports = brands;
