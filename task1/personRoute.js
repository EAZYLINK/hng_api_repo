import express from 'express'
import { Person } from './personModel.js'

export const personRoute = express.Router()

personRoute.post('/', async(req, res)=> {
    try {
        const {name} = req.body
        if(!name) {
            return res.status(400).json({
                success: false,
                message: "name of person is required"
            })
        }
        const newUser = Person(req.body)
        await newUser.save()
        res.status(201).json({
            success: true,
            message: "Person created successfullly!",
            user: newUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

personRoute.get('/:user_id', async(req, res)=> {
    try {
        const {user_id} = req.params
        if(!user_id) {
            return res.status(400).json({
                success: false,
                message: 'Please supply your ID as params'
            })
        }
        const findUser = await Person.findById(user_id)
        if(!findUser) {
            return res.status(404).json({
                success: false,
                message: 'User with supplied ID not found'
            })
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully!",
            user: findUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })    
    }
})

personRoute.put('/:user_id', async(req, res)=> {
    try {
        const {user_id} = req.params
        if(!user_id) {
            return res.status(400).json({
                success: false,
                message: 'Please supply your ID as params'
            })
        }
        const findAndUpdate = await Person.findByIdAndUpdate(user_id, req.body, {new: true})
        if(!findAndUpdate) {
            return res.status(404).json({
                success: false,
                message: 'User with supplied ID not found'
            })
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            user: findAndUpdate
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })    
    }
})

personRoute.delete('/:user_id', async(req, res)=> {
    try {
        const {user_id} = req.params
        if(!user_id) {
            return res.status(400).json({
                success: false,
                message: 'Please supply your ID as params'
            })
        }
        const findAndDelete = await Person.findOneAndDelete(user_id)
        if(!findAndDelete) {
            return res.status(404).json({
                success: false,
                message: 'User with supplied ID not found'
            })
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })    
    }
})