const express = require('express')
const { check, validationResult } = require('express-validator')

const logger = require('../helpers/logger')
const router = express.Router()

const Language = require('../models/language')

// Get languages
router.get('/', async (req, res, next) => {
    try {
        const languages = await Language.find()
        res.json(languages)
        logger.http(`Request at [GET:/api/language/]`)
    } catch (error) {
        logger.error(error);
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
        logger.http(`Request at [GET:/api/language/:lang] with language [${lang}]`)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Post language
router.post('/', [
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
        logger.info(`Language [${language._id}] created at [${req.ip}]`)

        res.json(language)
        logger.http(`Request at [POST:/api/language/]`)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Patch language
router.patch('/:lang', async (req, res, next) => {
    const { title } = req.body
    try {
        let language = await Language.findOne({ title: title })
        
        if (!language) { return res.status(400).send('Language does not exist') }
        
        language = await Language.findOneAndUpdate(
            { title },
            { $set: { title }}
        )

        await language.save()
        logger.info(`Language [${language._id}] updated at [${req.ip}]`)
        
        res.json(language)
        logger.http(`Request at [PATCH:/api/language/] with language [${language.title}]`)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Delete language
router.delete('/:lang', async (req, res, next) => {
    const lang = req.params.lang
    try {
        const language = await Language.findOne({ title: lang })

        if (!language) { return res.status(400).send('Language does not exists') }
        
        await Language.findOneAndDelete({ title: lang })  
        logger.info(`Language [${language._id}] removed at [${req.ip}]`)
        
        res.send('Language is deleted')
        logger.http(`Request at [DELETE:/api/language/]`)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})


module.exports = router;