const express = require('express')
const Staffs = express.Router()
const cors = require("cors")
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const bcrypt = require('bcryptjs')

const Staff = require("../models/staff")
Staffs.use(cors())

process.env.SECRET_KEY = 'huynbao'

//get all
Staffs.get('/', async (req, res) => {
    try {
        if (req.body.orderField) {
            let orderField = req.body.orderField;

            const options = {
                page: req.body.pageIndex,
                limit: req.body.pageSize,
                sort: { [orderField]: (req.body.orderBy) ? req.body.orderBy : 'asc' }
            }

            const staffs = await Staff.paginate({}, options);
            return res.json(staffs);
        }
        else {
            const options = {
                page: req.body.pageIndex,
                limit: req.body.pageSize
            };
            const staffs = await Staff.paginate({}, options);
            return res.json(staffs);
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
})

Staffs.post('/register', (req, res) => {
    const today = new Date()

    const staffData = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email,
        avatar: req.body.avatar,
        dateOfBirth: req.body.dateOfBirth,
        created: today
    }

    Staff.findOne({
        username: req.body.username
    })
        .then(staff => {
            if (!staff) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    staffData.password = hash
                    Staff.create(staffData)
                        .then(staff => {
                            res.json({ status: staff.username + " Registered" })
                        })

                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'Staff already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

Staffs.post('/login', (req, res) => {
    Staff.findOne({
        username: req.body.username
    })
        .then(user => {
            if (user) {
                // check password from user request
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        username: user.username,
                        role: user.role,
                        email: user.email
                    }
                    // create token from jwt
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 7200
                    })
                    // response token
                    res.json({ token: token })
                } else {
                    // response user don't exist | error : wrong password
                    res.json({ error: "User does not exist" })
                }
            } else {
                // response user don't exit | error: wrong user name
                res.json({ error: "User does not exist" })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

Staffs.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    Staff.findOne({
        username: decoded.username
    })
        .then(staff => {
            if (staff) {
                res.json(staff)
            } else {
                res.send("Staff does not exist")
            }
        })
        .catch(err => {
            res.send('err: ' + err)
        })
})


module.exports = Staffs;