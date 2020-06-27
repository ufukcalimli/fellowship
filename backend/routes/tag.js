const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')

const isAuth = require('../config/isAuth');

const Tag = require('../models/tag')
const Profile = require('../models/profile');

// Get tags
router.get('/', async (req, res, next) => {
    try {
        const tags = await Tag.find()
        res.json(tags)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})

// Get tag by name
router.get('/:tag', async (req, res, next) => {
    const tagName = req.params.tag
    try {
        const tag = await Tag.findOne({ title: tagName })
        
        if(!tag) return res.status(400).send('Tag is not found')

        res.json(tag)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})

// Get all posts by tag name
router.get('/:tag/posts', [
    check('title', 'Title should not be empty')
        .not()
        .isEmpty()
], async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty){ return res.status(400).json({ errors: errors.array() })}
        
    const tagName = req.params.tag
    try {
        const postsByTag = await Tag.findOne({ title: tagName}).populate('posts')
        
        if (!postsByTag) return res.status(400).send('No posts by this tag name')
        
        res.json(postsByTag)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})

// Post tag
router.post('/', [
    isAuth,
    check('title', 'Title should not be empty')
        .not()
        .isEmpty()
], async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) { return res.status(400).json({ errors: errors.array() }) }
        
    const { title } = req.body
    try {
        let tag = await Tag.findOne({ title })
        
        if (tag) return res.status(400).send('Tag is already exists')
        
        tag = await new Tag({ title })

        await tag.save()

        res.json(tag)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})

// Follow tag
router.post('/follow/:tag/:user_id', isAuth, async (req, res, next) => {
    const {tag, user_id} = req.params
    try {
        const dbTag = await Tag.findOne({ title: tag.toLowerCase() })
        const profile = await Profile.findOne({ user: user_id })

        console.log({ tag, user_id, dbTag, tag_id: dbTag._id, profile})

        if (!dbTag || !profile) {
            return res.status(400).send('An error occurred while following the tag by the user, check parameters')
        }

        await Profile.findOneAndUpdate(
            { user: user_id },
            { $push: { tags: dbTag._id } },
            { new: true }
        )

        res.json(profile)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})

// Delete tag
router.delete('/:tag', isAuth, async (req, res, next) => {
    const tagName = req.params.tag
    try {
        const tag = await Tag.findOne({ title: tagName })
        
        if (!tag) return res.status(400).send('This tag does not exist')
        
        await Tag.findOneAndDelete({ title: tagName })
        
        res.send('Tag is deleted')
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})


module.exports = router;