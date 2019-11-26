var express= require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const path = require('path');
var app = express(); 
var mongoose = require('mongoose')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDes = require('./api/swagger.json');
var port = process.env.PORT || 3000;

// import routes
var Users= require('./routes/user.js')
var typeProducts= require('./routes/typeProduct.js')
var Products= require('./routes/product.js')
var Invoice= require('./routes/invoice.js')
var Info= require('./routes/storeInfo.js')
var Staff= require('./routes/staff.js')
var brand= require('./routes/brand.js')

//middleware 
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

//connectiong string 
//-----localhost
// const mongoURI ='mongodb://localhost/phoneShopDB';
//-----cloud host
const mongoURI="mongodb+srv://baobao:youonlylionkul@bbcluster0-2u8x9.mongodb.net/PhoneShopDB?retryWrites=true&w=majority"

//connect to mongo dbs
mongoose
.connect(mongoURI,{useNewUrlParser:true, useUnifiedTopology: true })
.then(()=> console.log("MongoDb Connected"))
.catch(err=> console.log(err))

//set up routes
app.use('/api/users',Users)
app.use('/api/typeproduct',typeProducts);
app.use('/api/brand',brand);
app.use('/api/product',Products);
app.use('/api/invoice',Invoice);
app.use('/api/info',Info);
app.use('/api/staff',Staff);
app.use('/assets',express.static(path.join(__dirname, 'assets')));
//Config swagger
const swaggerOptions = {
  swaggerDefinition: swaggerDes,
  apis: ['.routes/*.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Kick-off
app.get("/",(req,res)=>{res.json('Hello World')})

//start server
app.listen(port,function(){
    console.log("Server is running on port: "+port)
})
