const express = require('express');
const router = express.Router();
const User = require('../models/User')
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connectionURL = 'mongodb://localhost:27017/TestBlog';

mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })

//Register
router.post('/register', async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email })
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'mail exists'
            })
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                    return req.status(500).json({
                        error: err
                    })
                }
                else {
                    req.body.password = hash
                    let newUser = await User.create(req.body)
                    console.log("user created", newUser)
                    res.json(newUser)
                    res.end()
                }
            })
        }
    } catch (error) {
        console.log("error in inserting user", error)
    }
})

//login api
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email })
        if (user.length >= 1) {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "auth failed"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        user_id: user[0]._id
                    },
                        'abc',
                        { expiresIn: 5 * 60 }
                    );
                    return res.status(200).json({
                        message: "auth successfull",
                        token: token,
                        user_id: user[0]._id
                    })
                }
                else {
                    res.status(401).json({
                        message: 'invalid password'
                    })
                }
            })
        } else {
            return res.status(404).json({
                message: "Mail not found"
            })
        }
    } catch (error) {
        console.log("error in inserting user", error)
    }
})

module.exports = router;