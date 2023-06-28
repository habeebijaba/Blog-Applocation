const express = require('express')
const router = express.Router()

const {
    signUp,
    login,
    logout
}
    = require('../controllers/authController')

router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', logout)

router.get('/test', (req, res) => {
    res.send("success")
})

module.exports = router