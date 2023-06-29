const express = require('express')

const router = express.Router()

const {
    getPosts,
    getPost,
    addPost,
    deletePost,
    updatePost,
    searchPost
     } = require('../controllers/postController')

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)
router.get('/searchPost/:key',searchPost)


module.exports = router