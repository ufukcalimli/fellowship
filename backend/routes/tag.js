const express = require('express');
const { check, validationResult } = require('express-validator')

const logger = require('../helpers/logger')
const isAuth = require('../config/isAuth');

const router = express.Router();

const Tag = require('../models/tag')
const Profile = require('../models/profile');

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
        logger.info(`Tag [${tag._id}] created at [${req.ip}]`)

        res.json(tag)
        logger.http(`Request at [POST:/api/tag/]`)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Follow tag
router.post('/follow/:tag/', isAuth, async (req, res, next) => {
    const { tag } = req.params
    const user_id = req.user._id
    try {
        const dbTag = await Tag.findOne({ title: tag.toLowerCase() })
        let profile = await Profile.findOne({ user: user_id })

        if (!dbTag || !profile) {
            return res.status(400).send('An error occurred while following the tag by the user, check parameters')
        }

        profile = await Profile.findOneAndUpdate(
            { user: user_id },
            { $addToSet: { tags: dbTag } },
            { new: true }
        )

        logger.info(`Tag [${tag._id}] followed by [${profile._id}] at [${req.ip}]`)
        res.json(profile)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})

// Unfollow tag
router.post('/unfollow/:tag', isAuth, async (req, res, next) => {
    const { tag } = req.params
    const user_id = req.user._id
    try {
        const dbTag = await Tag.findOne({ title: tag.toLowerCase() })
        let profile = await Profile.findOne({ user: user_id })

        if (!dbTag || !profile) {
            return res.status(400).send('An error occurred while unfollowing the tag by the user, check parameters')
        }

        profile = await Profile.findOneAndUpdate(
            { user: user_id },
            { $pull: { tags: { _id: dbTag } } },
            { new: true }
        )
        console.log({profile})
        res.json(profile)
        logger.http(`Request at [GET:/api/tag/follow/:tag/:user_id] with tag [${tag}] and user id [${user_id}]`)
    } catch (error) {
        logger.error(error);
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
        logger.info(`Tag [${tagName}] removed at [${req.ip}]`)
        
        res.send('Tag is deleted')
        logger.http(`Request at [DELETE:/api/tag/]`)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})


module.exports = router;