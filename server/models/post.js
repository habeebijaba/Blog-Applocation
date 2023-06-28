const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type:String,
        required:true,
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
    },
    cat: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    })

const Post = mongoose.model("Post", postSchema)
module.exports = Post