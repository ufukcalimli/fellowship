const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const passport = require('passport')

const User = require('../models/user')
const Profile = require('../models/profile')

const router = express.Router()

// Post user
router.post('/signup', [
    check('user_name', 'User name is required!')
        .not()
        .isEmpty(),
    check('email', 'User email is required!')
        .isEmail(),
    check('password', 'Password should contain minimum 6 characters!')
        .isLength({ min: 6})
], async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array()})}        
        
    const { email, password, user_name} = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) { return res.status(400).json({ msg: 'User already exists' }) }

        let profile = await Profile.findOne({ user_name })
        if(profile) { return res.status(400).json({ msg: 'Profile exists with this user name, please log in'})}

        user = await new User({
            email,
            password,
        })

        profile = await new Profile({
            user_name,
            user: user._id
        })
        await profile.save()

        // Password encryption
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

router.post('/login',
    passport.authenticate('local',
        {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
    }),
    async (req, res, next) => {
        const { email, password } = req.body
        try {
            res.send(`Logged in`)
            // let user = await User.findOne({ email })
            // if (!user) { 
            //     return res.status(400).json({ error: 'Invalid credentials!' })
            // }

            // const isMatch = await bcrypt.compare(password, user.password)
            // if (!isMatch) {
            //     return res.status(400).json({ error: 'Invalid credentials!' })
            // }
                
            // const payload = {
            //     user: {
            //         id: user.id
            //     }
            // }

            // jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 36000 }, (err, token) => {
            //     if (err) throw err;
            //     res.json({ token })
            // })   
        } catch (error) { res.status(500).send('Server error')}    
    }
)

    
router.get('/login/redirect', (req, res, next) => {
    res.send(`login redirect, user: ${req.user}`)
})

module.exports = router