const express = require('express');
const router = express.Router();
const Blogs = require('../models/Blogs')
const mongoose = require('mongoose');
var ensureAuth = require('../middleware/check-auth');

const connectionURL = 'mongodb://localhost:27017/TestBlog';
mongoose.connect(connectionURL, { useNewUrlParser: true })

//list blogs
router.get('/', ensureAuth, async (req, res) => {
    try {
       let user_id = req.userData.user_id
        const blogs = await Blogs.find({ user: user_id })
        return res.json({
            result: blogs
        })
    } catch (error) {
        console.log("error while getting blogs", error)
    }
})

//add new blogs
router.post('/addblog', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.userData.user_id
        let newBlog = await Blogs.create(req.body)
        return res.json({
            blogs:newBlog
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;