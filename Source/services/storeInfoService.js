const storeInfoModel = require('../models/storeInfo');

let getAll = () => {
    return new Promise(async (resolve, reject) => {
        let storeInfo = await storeInfoModel.getAll();
        resolve(storeInfo);
    })
}

let createNew = (phone,address,email,name,date,company) => {
    return new Promise(async (resolve, reject) => {
        let storeInfoItem = {
            phoneNumb: phone,
            address: address,
            email: email,
            name: name,
            date: date,
            company: company
        }
        let storeInfo = await storeInfoModel.createNew(storeInfoItem);
        resolve(storeInfo);
    })
}

module.exports = {
    getAll: getAll,
    createNew: createNew
}