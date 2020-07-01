const express = require('express');
const { check, validationResult } = require('express-validator')

const logger = require('../helpers/logger')
const router = express.Router();

const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment');
const profile = require('../models/profile');

// Get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();

        res.json(users)
        logger.http('Request at [GET:/api/user/]')
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Get user by id
router.get('/:id', async (req, res, next) => {
    const userId = req.params.id
    try {
        const user = await User.findOne({ _id : userId})

        if(!user) return res.status(400).json({ msg: 'User is not found'})

        res.json(user)
        logger.http(`Request at [GET:/api/user/:id] with user id [${userId}]`)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Update user
router.patch('/:id', [
    check('name', 'User name is required!')
        .not()
        .isEmpty(),
    check('email', 'User email is required!')
        .isEmail()
], async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array()})}    
    
    const userId = req.params.id
    const { name, email} = req.body
    try {
        let user = await User.findById(userId).select('-password')

        if (!user) return res.status(400).send('User is not found')

        user = await User.findOneAndUpdate(
            { _id : userId},
            { $set : {
                name,
                email,
            } },
            { new: true }
        )

        await user.save()

        res.json(user)
        logger.http(`Request at [PATCH:/api/user/:id] with user id [${userId}]`)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Delete user
router.delete('/:id', async (req, res, next) => {
    const userId = req.params.id
    try {
        const user = await User.findById({ _id: userId})

        if (!user) return res.status(400).send('User is not found')
        
        await Promise.all([
            await Comment.deleteMany({ user: userId}),
            await Post.deleteMany({ user: userId }),
            await profile.findOneAndDelete({ user: userId}),
            await User.findOneAndDelete({ _id: userId })
        ])

        res.json({ msg: 'User deleted' })
        logger.http(`Request at [DELETE:/api/user/:id] with user id [${userId}]`)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

module.exports = router;