const mongoose = require('mongoose')
const Post = require('../models/post.js')
const ObjectId = mongoose.Types.ObjectId
const jwt = require('jsonwebtoken')


const getPosts = async (req, res) => {
    try {
        let cat = req.query.cat
        if (cat) {
            const posts = await Post.find({ cat: cat }).populate('author', 'username')
            res.status(200).json(posts)

        } else {
            const posts = await Post.find().populate('author', 'username')
            res.status(200).json(posts)

        }



    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getPost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id).populate('author', 'username')
        console.log(post);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }

}

const addPost = async (req, res) => {
    console.log(req.body);
    const { author, title, desc, cat, img } = req.body
    const newPost = new Post({
        author: author._id,
        title,
        img,
        desc,
        cat
    });

    await newPost.save()
    res.status(200).json("post has been created")
}



const deletePost = async (req, res) => {

    const token = req.cookies.access_token

    if (!token) return res.status(401).json("not authenticated")

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid")
    })
    const id = req.params.id

    await Post.deleteOne({ _id: id })
    res.status(200).json("Post has been deleted")

}

const updatePost = async (req, res) => {
    const postId = req.params.id
    const { author, title, desc, cat, img } = req.body


    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
            author: author._id,
            title, img, desc, cat
        },
        { new: true }
    );

    res.status(200).json("post has been updated")
}

module.exports = {
    getPosts,
    getPost,
    addPost,
    deletePost,
    updatePost
}