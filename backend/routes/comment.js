const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator')

const Comment = require('../models/comment')
const User = require('../models/user')
const Post = require('../models/post')

// Get comments
router.get('/', async (req, res, next) => {
    try {
        const comment = await Comment.find()
        
        res.json(comment)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})

// Get comment by id
router.get('/:id', async (req, res, next) => {
    const commentId = req.params.id
    try {
        const comment = await Comment.findById(commentId)
        
        if(!comment) return res.status(400).send('Comment is not found')

        res.json(comment)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})

// Get all comments by profile id
router.get('/profile/:profile_id', async (req, res, next) => {
    const profile_id = req.params.profile_id
    try {
        const commentsByProfileId = await Comment.findOne({ profile: profile_id })
        
        if (!commentsByProfileId) return res.status(400).send('No comments by this profile')
        
        res.json(commentsByProfileId)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})

// Get all comment by post id
router.get('/post/:post_id', async (req, res, next) => {
    const postId = req.params.post_id
    try {
        const commentsByPostId = await Comment.findOne({ post: postId })
        
        if (!commentsByPostId) return res.status(400).send('No comments of this post')
        
        res.json(commentsByPostId)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})

// Post comment
router.post('/', [
    check('content', 'Content of comment should not be empty!')
        .not()
        .isEmpty()
], async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) { return res.status(400).json({ errors: errors.array()})}    
        
    const { content, user, post } = req.body
    try {
        const comment = await new Comment({
            content,
            user,
            post
        })

        await Post.findOneAndUpdate(
            { _id: post },
            { $push: { comments: comment }}
        )

        await comment.save()

        res.json(comment)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})

// Update comment
router.patch('/:id', [
    check('content', 'Content of comment should not be empty!')
        .not()
        .isEmpty()
], async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }
        
    const comment_id = req.params.id
    const { content } = req.body
    try {
        const comment = Comment.findById({ commentId })
        
        if(!comment) return res.status(400).send('Comment is not found')

        comment = Comment.findByIdAndUpdate(
            { _id: comment_id},
            {
                $set: {
                    content,
                }
        })

        await comment.save()

        res.json(comment)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})

// Delete comment
router.delete('/:comment_id', async (req, res, next) => {
    const comment_id = req.params.comment_id
    try {
        const comment = await Comment.findOne({ _id: comment_id })
        
        if (!comment) return res.status(400).send('This comment does not exist')
        
        await Promise.all([
            await Post.findOneAndUpdate(
                { _id: comment.post.toString() },
                { $pull: { comments: comment_id }}
            ),
            await Comment.findOneAndDelete({ _id: comment_id })
        ])
        
        res.send('Comment is deleted')
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!')
    }
})


module.exports = router;