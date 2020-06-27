const express = require('express')
const { check, validationResult } = require('express-validator')

const Language = require('../models/language')
const isAuth = require('../config/isAuth')

const router = express.Router()

// Get languages
router.get('/', async (req, res, next) => {
    try {
        const languages = await Language.find()
        res.json(languages)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

// Get language by name 
router.get('/:lang', async (req, res, next) => {
    const lang = req.params.lang
    try {
        const language = await Language.findOne({ title: lang })

        if (!language) { return res.status(400).send('Language is not found') }
        
        res.json(language)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

// Post language
router.post('/', [
    isAuth,
    check('title', 'Title should not be empty')
        .not()
        .isEmpty()
], async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){ return res.status(400).json({ errors: errors.array()})}    
        
    const { title } = req.body
    try {
        let language = await Language.findOne({ title })
        if (language) { return res.status(400).send('Language is already exists') }
        
        language = await new Language({ title })

        await language.save()

        res.json(language)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

// Patch language
router.patch('/:lang', [
        isAuth,
        check('title', 'Title should not be empty')
            .not()
            .isEmpty()
    ], async (req, res, next) => {
    const lang = req.params.lang
    const { title } = req.body
    try {
        let language = await Language.findOne({ title: title })
        
        if (!language) { return res.status(400).send('Language does not exist') }
        
        language = await Language.findOneAndUpdate(
            { title },
            { $set: { title }}
        )

        await language.save()
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})

// Delete language
router.delete('/:lang', isAuth, async (req, res, next) => {
    const lang = req.params.lang
    try {
        const language = await Language.findOne({ title: lang })

        if (!language) { return res.status(400).send('Language does not exists') }
        
        await Language.findOneAndDelete({ title: lang })  
        
        res.send('Language is deleted')
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error!')
    }
})


module.exports = router;