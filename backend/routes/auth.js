const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

const User = require('../models/user')
const { JsonWebTokenError } = require('jsonwebtoken')

// login
router.post('/login', [
    check('email', 'Please input email')
        .not()
        .isEmpty(),
    check('password', 'Please should contain 6 characters')
        .isLength({ min: 6 })
], async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }
    
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) { 
            return res.status(400).json({ errors: [{  msg: 'Invalid credentials!'}] })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ errors: [{  msg: 'Invalid credentials!'}] })
        }
            
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })   
    } catch (error) { res.status(500).send('Server error')}    
})

module.exports = router