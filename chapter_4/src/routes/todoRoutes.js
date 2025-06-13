import express from 'express'
import db from '../db.js'
import prisma from '../prismaClient.js'

const router = express.Router()

// Get todos for logged in users
router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    })
    res.json(todos)
})

// Create a new todo
router.post('/', async (req, res) => {
    const { task } = req.body;

    const newTodo = await prisma.todo.create({
        data: {
            task,
            userId: req.userId
        }
    })
    res.status(201).json({ todo })
})

router.put('/:id', async (req, res) => {
    const { completed } = req.body
    const { id } = req.params

    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: req.userId
        },
        data: {
            completed: !!completed
        }
    })

    res.status(200).json({ updatedTodo })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId: req.userId
        }
    })
    res.status(200).json({ message: 'todo deleted' })
})

export default router;