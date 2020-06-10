const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')
const Tag = require('../models/tag')

// Get all posts
router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find().populate(['comment', 'tag'])

        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

// Get post by post id
router.get('/:id', async (req, res, next) => {
    const postId = req.params.id
    try {
        const post = await Post.findById({ _id: postId }).populate(['comment', 'tag'])
        
        if(!post) return res.status(400).send('Post not found!')
        
        res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

const filterTags = (db, reqTags) => { return db.filter(item => reqTags.includes(item.title)) }

// Post post
router.post('/', async (req, res, next) => {
    const {
        title,
        content,
        user,
        label,
        tags } = req.body
    
    try {
        const tagsFromDb = await Tag.find()
        const filteredTags = filterTags(tagsFromDb, tags)

        const newPost = await new Post({
            title,
            content,
            creator: user,
            label,
            tags: filteredTags
        })
        
        // add the post to user's posts array
        await User.findByIdAndUpdate(
            { _id: user },
            { $push: { posts: newPost } }
        )
        
        // iterate given tags and append them in new post's tags array and save the post in the tag model as well
        if (filteredTags && filteredTags.length > 0) {
            filteredTags.map(tag => {
                //newPost.tags.shift({ tag: tag._id })
                const tagOfPost = Tag.findOneAndUpdate(
                    { title: tag },
                    { $push: { posts: newPost._id}}
                )
            })
        }

        await newPost.save()

        res.json(newPost)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

// Update post
router.patch('/:id', async (req, res, next) => {
    const postId = req.params.id
    const {
        title,
        content,
        user,
        label,
        tags } = req.body
    try {
        let post = await Post.findById(postId)

        if (!post) return res.status(400).send('Post is not found')
        
        const tagsFromDb = await Tag.find()
        const filteredTags = filterTags(tagsFromDb, tags)

        post = await Post.findOneAndUpdate(
            { _id: postId },
            {
                $set: {
                    title,
                    content,
                    tags: filteredTags,
                    user,
                    label
                }
            },
            { new: true }
        )
        
        // iterate given tags and append them in new post's tags array and save the post in the tag model as well
         if (filteredTags && filteredTags.length > 0) {
            filteredTags.map(tag => {
                //newPost.tags.shift({ tag: tag._id })
                const tagOfPost = Tag.findOneAndUpdate(
                    { title: tag },
                    { $push: { posts: post._id}}
                )
            })
        }
        
        await post.save()

        res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

// Delete post
router.delete('/:id', async (req, res, next) => {
    const postId = req.params.id
    try {
        const post = await Post.findById({ _id: postId })
        
        if (!post) return res.status(400).send('Post is not found')
        
        await Comment.deleteMany({ post: postId })
        await Post.findOneAndDelete({ _id: postId })
        
        res.json({ msg: 'Post deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

module.exports = router;