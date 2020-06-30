const express = require('express');
const { check, validationResult } = require('express-validator')

const logger = require('../helpers/logger')
const router = express.Router();

const Role = require('../models/role')

// Get roles
router.get('/', async (req, res, next) => {
    try {
        const roles = await Role.find()
        
        res.json(roles)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Get role by name
router.get('/:role', async (req, res, next) => {
    const roleName = req.params.role
    try {
        const role = await Role.findOne({ title: roleName })
        
        if(!role) return res.status(400).send('Role is not found')

        res.json(role)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Post role
router.post('/', [
    check('title', 'Title should not be empty!')
        .not()
        .isEmpty()
], async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) { return res.status(400).json({ errors: errors.array()})}    
        
    const { title } = req.body
    try {
        let role = await Role.findOne({ title })

        if (role) return res.status(400).send('Role is already exists')
        
        role = new Role({ title })

        await role.save()

        res.json(role)
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})

// Delete role
router.delete('/:role', async (req, res, next) => {
    const roleName = req.params.role
    try {
        const role = await Role.findOne({ title: roleName })
        
        if (!role) return res.status(400).send('This role does not exist')
        
        await Role.findOneAndDelete({ title: roleName })
        
        res.send('Role is deleted')
    } catch (error) {
        logger.error(error);
        res.status(500).send('Server error!')
    }
})


module.exports = router;