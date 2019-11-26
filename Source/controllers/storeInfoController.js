const express = require('express')
// const Info= require('../models/storeInfo')
// const Info = require("../models/storeInfo")
const { storeInfo } = require('../services/index');

let createNewInstance = async (req, res) => {
    //create new instance
    let phoneNumb = req.body.phoneNumb;
    let address = req.body.address;
    let email = req.body.email;
    let name = req.body.name;
    let date = new Date(req.body.date);
    let company = req.body.company;

    try {
        let info = await storeInfo.createNew(phoneNumb,address,email,name,date,company);
        return res.json(info);
    }
    catch (error) {
        return res.status(500).send(error);
    }
}

let getAllInfo = async (req, res) => {
    // Info.find((err, info) => {
    //     if (err) return res.send(err);

    //     //return the types
    //     res.json(info);
    // })
    try {
        let info = await storeInfo.getAll();
        res.json(info);
    }
    catch (error) {
        return res.status(500).send(error);
    }

}


module.exports = {
    createNewInstance: createNewInstance,
    getAllInfo: getAllInfo
};
