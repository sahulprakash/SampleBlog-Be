const express = require('express');
const router = express.Router();
const Blogs = require('../models/Blogs')
const mongoose = require('mongoose');
var ensureAuth = require('../middleware/check-auth');

const connectionURL = 'mongodb://localhost:27017/TestBlog';
mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useFindAndModify', false)

//list blogs
router.get('/listblog', ensureAuth, async (req, res) => {
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
            blogs: newBlog
        })
    } catch (error) {
        console.log(error)
    }
})

//update blogs
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let blog = await Blogs.findById(req.params.id)
        if (!blog) {
            return res.status(500)
        }
        if (blog.user != req.userData.user_id) {
            console.log("error, blog is not yours")
            return res.status(500)
        } else {
            console.log("entered to route")
            var updateBlog = await Blogs.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                // runValidators: true
            })
            return res.json({
                blogs: updateBlog,
                message: "successfully updated"
            })
        }
    } catch (error) {
        console.log(error)
        return error.json({
            message: "error while updating blogs"
        })
    }
})

//delete blogs
   router.delete('/:id',ensureAuth,  async (req, res) => {
    try {
        await Blogs.remove({ _id: req.params.id })
        return res.json({
            message: "blog deleted"
        })
    } catch (error) {
        return res.send(error)
    }
})

module.exports = router;