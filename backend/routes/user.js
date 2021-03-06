const express = require('express');
const router = express.Router();

const User = require('../models/user')
const Post = require('../models/post')
const Role = require('../models/role')
const Comment = require('../models/comment')

// Get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();

        res.json(users)
    } catch (error) {
        console.log(error);
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
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

// Post user
router.post('/', async (req, res, next) => {
    const {name, email, password, role} = req.body;
    try {
        let user = await User.findOne({ email });

        if(user) return res.status(400).json({ msg: 'User already exists'})

        const userRole = await Role.findOne({ title: role })
        console.log({name, email, password, role, userRole})
        user = await new User({
            name,
            email,
            password,
            role: userRole._id
        })

        await user.save()

        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

// Update user
router.patch('/:id', async (req, res, next) => {
    const userId = req.params.id
    const { name, email, role} = req.body
    try {
        let user = await User.findById(userId).select('-password')

        if (!user) return res.status(400).send('User is not found')
        
        const userRole = Role.findOne({title: role})

        user = await User.findOneAndUpdate(
            { _id : userId},
            { $set : {
                name,
                email,
                role: userRole._id
            } },
            { new: true }
        )

        await user.save()

        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

// Delete user
router.delete('/:id', async (req, res, next) => {
    const userId = req.params.id
    try {
        const user = await User.findById({ _id: userId})

        if (!user) return res.status(400).send('User is not found')
        
        await Comment.deleteMany({ user: userId})
        await Post.deleteMany({ user: userId })
        await User.findOneAndDelete({ _id: userId })
        
        res.json({ msg: 'User deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

module.exports = router;