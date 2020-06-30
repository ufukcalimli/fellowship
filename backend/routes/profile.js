const express = require('express');
const { check, validationResult } = require('express-validator')

const logger = require('../helpers/logger')
const router = express.Router();

const Profile = require('../models/profile');
const Language = require('../models/language');
const Role = require('../models/role')

// Get all profiles
router.get('/', async (req, res, next) => {
    try {
        const profiles = await Profile.find();

        res.json(profiles)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Get profile by username
router.get('/:user_name', async (req, res, next) => {
    const userName = req.params.user_name
    try {
        const profile = await Profile.findOne({ user_name: userName })
        
        if (!profile) { return res.status(400).send('Profile is not found') }
        
        res.json( profile )
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Patch profile
router.patch('/:user_name', [
    check('user_name', 'User name should not be empty')
        .not()
        .isEmpty(),
    check('first_name', 'First name should not be empty')
        .not()
        .isEmpty(),
    check('last_name', 'Last name should not be empty')
        .not()
        .isEmpty(),
    check('languages', 'Input at least one language')
        .isArray()
        .not()
        .isEmpty(),
    check('role', 'Assign a role for yourself')
        .not()
        .isEmpty()
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) };
    
    const { user_name, first_name, last_name, languages, role } = req.body
    try {
        let profile = await Profile.findOne({ user_name })
        
        if (!profile) { return res.status(400).send('Profile is not found!') }

        const dbLanguages = await Language.find()
        const filteredLangs = dbLanguages.filter(item => languages.includes(item.title)) 

        const dbRole = await Role.findOne({ title: role})
        
        profile = await Profile.findOneAndUpdate(
            { user_name },
            {
                $set: {
                    user_name,
                    first_name,
                    last_name,
                    languages: filteredLangs,
                    role: dbRole._id
                }
            },
            { new: true}
        )

        await profile.save()

        res.json(profile)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }    
})

// Delete profile
router.delete('/:user_name', async (req, res, next) => {
    const user_name = req.params.user_name
    try {
        await Profile.findOneAndRemove({ user_name })
        
        res.send('Profile removed')
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }  
})


module.exports = router;