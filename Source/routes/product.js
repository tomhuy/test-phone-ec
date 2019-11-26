const express = require('express')
const Products = express.Router()
const cors = require("cors")
var mongoose = require('mongoose');
const Product = require("../models/product")
const TypeProduct = require("../models/typeProduct")
const brand = require("../models/brand")
const {upload} = require("../middlewares/multer")
// var multer = require('multer');
// var fs = require('fs');

Products.use(cors())

//create  product
Products.post('/create', async (req, res) => {

    var pro = new Product();
    pro.name = req.body.name;
    pro.price = req.body.price;
    pro.promotion = req.body.promotion;
    pro.brand = req.body.brand;
    pro.phoneInfo = req.body.phoneInfo;
    pro.typeProduct = req.body.typeProduct;
    pro.imagePaths = req.body.imagePaths;
    pro.quantity = req.body.quantity;
    pro.description = req.body.description;
    pro.alias = req.body.alias;

    pro.save((err, pro) => {
        if (err) {
            if (err.code == 11000) {
                return res.json({ sucesss: false, message: 'this product already exists' });

            }
            else
                return res.send(err);
        }
        res.json({ message: 'Product created' });
        TypeProduct.updateOne({ _id: req.body.typeProduct }, { $push: { products: pro._id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                }
            });
        brand.updateOne({ _id: req.body.brand }, { $push: { products: pro._id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                }
            });
    })
})

// upload section 
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         var dir = 'uploads';
//         if (!fs.existsSync(dir)){
//             fs.mkdirSync(dir);
//         }
//         cb(null, dir);
//     },
//     filename: function (req, file, cb) {
//         // cb(null, new Date().toISOString() + file.originalname);
//         const dotIndex = file.originalname.lastIndexOf('.');
//         const fileExtension = file.originalname.substring(dotIndex + 1);
//         cb(null, `${Date.now()}.${fileExtension}`)
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     }
// });

Products.post('/upload', upload.single('productImage'), async (req, res) => {
    // console.log(req.file);
    //co return ji ve dau men a 
    res.json(req.file.filename);
})

// get product
Products.post('/get', async (req, res) => {
    try {
        if (req.body.orderField) {
            let orderField = req.body.orderField;

            const options = {
                page: req.body.pageIndex,
                limit: req.body.pageSize,
                sort: { [orderField]: (req.body.orderBy) ? req.body.orderBy : 'asc' }
            }

            const products = await Product.paginate({}, options);
            return res.json(products);
        }
        else {
            const options = {
                page: (req.body.pageIndex) ? req.body.pageIndex : 1,
                limit: (req.body.pageSize) ? req.body.pageSize : 100
            };
            // const products = await Product.paginate({}, options);
            // const products = await Product.populate('typeProduct').paginate({}, options);
            Product.find()
                .populate('brand')
                .populate('typeProduct')
                .exec(async (err, data) => {
                    if (err) return console.log(err);
                    var pro = await PaginatorArray(data, options.page, options.limit);
                    res.json({ "docs": pro.data, "totalDocs": pro.total, "totalPages": pro.total_pages });
                })

        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
})

//Get product by its type of product ID
Products.post('/filter', async (req, res) => {
    // TypeProduct.findOne({ _id: req.body.typeproduct_id })
    //     .populate('products')
    //     .exec(function (err, type) {
    //         if (err) return console.log(err);

    //         //return the products
    //         res.json(type.products);
    //     }) 

    const options = {
        page: (req.body.pageIndex) ? req.body.pageIndex : 1,
        limit: (req.body.pageSize) ? req.body.pageSize : 100
    };

    if (req.body.typeproduct_id) {
        if (req.body.brand_id) {
            Product.find({ $and: [{ typeProduct: req.body.typeproduct_id }, { brand: req.body.brand_id }] }).populate('products').populate('brand').then(async data => {
                var pro = await PaginatorArray(data, options.page, options.limit);
                res.json({ "docs": pro.data, "totalDocs": pro.total, "totalPages": pro.total_pages });
            }).catch(err => {
                console.log(err)
            })
        } else {
            Product.find({ typeProduct: req.body.typeproduct_id }).populate('products').then(async data => {
                var pro = await PaginatorArray(data, options.page, options.limit);
                res.json({ "docs": pro.data, "totalDocs": pro.total, "totalPages": pro.total_pages });
            }).catch(err => {
                console.log(err)
            })
        }
    } else {
        Product.find({ brand: req.body.brand_id }).populate('brand').then(async data => {
            var pro = await PaginatorArray(data, options.page, options.limit);
            res.json({ "docs": pro.data, "totalDocs": pro.total, "totalPages": pro.total_pages });
        }).catch(err => {
            console.log(err)
        })
    }

});

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


//on routes end at /product/:product_id
Products.route('/:product_id')
    //get the product by id
    .get((req, res) => {
        Product.findById(req.params.product_id, function (err, pro) {
            if (err) return res.send(err);

            //return that type product
            res.json(pro);
        })
    })
    .put((req, res) => {
        Product.findById(req.params.product_id, (err, pro) => {
            if (err) return res.send(err);

            //set the new type of product if it exists in the request 
            if (req.body.name) pro.name = req.body.name;
            if (req.body.price) pro.price = req.body.price;
            if (req.body.promotion) pro.promotion = req.body.promotion;
            if (req.body.phoneInfo) pro.phoneInfo = req.body.phoneInfo;
            if (req.body.Type) pro.typeProduct = req.body.Type;
            if (req.body.imagePaths) pro.imagePaths = req.body.imagePaths;
            if (req.body.quantity) pro.quantity = req.body.quantity;
            if (req.body.description) pro.description = req.body.description;
            if (req.body.alias) pro.alias = req.body.alias;

            //save the product
            pro.save(err => {
                if (err) return res.send(err);

                //return a message 
                res.json({ message: 'product updated' })
            })
        })
    })
    .delete((req, res) => {
        Product.remove({
            _id: req.params.product_id
        }, err => {
            if (err) return res.send(err)
            res.json({ message: 'successfully deleted' })
        })
    })

module.exports = Products;

