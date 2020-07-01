const express = require('express');
const { check, validationResult } = require('express-validator')

const logger = require('../helpers/logger')
const router = express.Router();

const Tag = require('../models/tag')
const Profile = require('../models/profile')

// Get tags
router.get('/', async (req, res, next) => {
    try {
        const tags = await Tag.find()
        res.json(tags)
        logger.http(`Request at [GET:/api/tag/]`)
    } catch (error) {
        logger.error(error);
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
        logger.http(`Request at [GET:/api/tag/:tag] with tag name [${tagName}]`)
    } catch (error) {
        logger.error(error);
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
        logger.http(`Request at [GET:/api/tag/:tag/posts] with tag name [${tagName}]`)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Post tag
router.post('/', [
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
        logger.http(`Request at [POST:/api/tag/]`)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Follow tag
router.post('/follow/:tag/:user_id', async (req, res, next) => {
    const {tag, user_id} = req.params
    try {
        const dbTag = await Tag.findOne({ title: tag.toLowerCase() })
        const profile = await Profile.findOne({ user: user_id })

        if (!dbTag || !profile) {
            return res.status(400).send('An error occurred while following the tag by the user, check parameters')
        }

        await Profile.findOneAndUpdate(
            { user: user_id },
            { $push: { tags: dbTag._id } },
            { new: true }
        )

        res.json(profile)
        logger.http(`Request at [GET:/api/tag/follow/:tag/:user_id] with tag [${tag}] and user id [${user_id}]`)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Delete tag
router.delete('/:tag', async (req, res, next) => {
    const tagName = req.params.tag
    try {
        const tag = await Tag.findOne({ title: tagName })
        
        if (!tag) return res.status(400).send('This tag does not exist')
        
        await Tag.findOneAndDelete({ title: tagName })
        
        res.send('Tag is deleted')
        logger.http(`Request at [DELETE:/api/tag/]`)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})


module.exports = router;