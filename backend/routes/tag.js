const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')

const Tag = require('../models/tag')

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

// Delete tag
router.delete('/:tag', async (req, res, next) => {
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