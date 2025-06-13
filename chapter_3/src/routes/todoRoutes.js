import express from 'express'
import db from '../db.js'

const router = express.Router()

// Get todos for logged in users
router.get('/', (req, res) => {
    const getTodos = db.prepare(/*sql*/`
            SELECT * FROM todos
            WHERE user_id = ?
        `)
    const todos = getTodos.all(req.userId)
    res.json(todos)
})

// Create a new todo
router.post('/', (req, res) => {
    const { task } = req.body;
    const insertTodo = db.prepare(/*sql*/`
            INSERT INTO todos (user_id, task)
            VALUES (?, ?)
        `)
    const result = insertTodo.run(req.userId, task)
    res.status(201).json({ id: result.lastInsertRowid, task, completed: 0 })
})

router.put('/:id', (req, res) => {
    const { completed } = req.body
    const { id } = req.params

    const updatedTodo = db.prepare(/*sql*/`
            UPDATE todos
            SET completed = ?
            WHERE id = ? AND user_id = ?
        `)



    updatedTodo.run(completed, id, req.userId)
    res.status(200).json({ message: 'todo completed' })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const deleteTodo = db.prepare(/*sql*/`
        DELETE FROM todos 
        WHERE id = ? AND user_id = ?
    `)
    deleteTodo.run(id, req.userId)
    res.status(200).json({ message: 'todo deleted' })
})

export default router;