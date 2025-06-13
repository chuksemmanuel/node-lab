import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

// Register a new user endpoint /auth/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)

    // encrypt password
    const hashedPassword = bcrypt.hashSync(password)

    // save the new user and hash password to the db
    try {
        const insertUser = db.prepare(/*sql*/`
            INSERT INTO users (username, password)
            VALUES (?, ?)
            `)

        const result = insertUser.run(username, hashedPassword)

        // add default todo
        const defaultTodo = 'Hello! Add your first todo!'

        const insertTodo = db.prepare(/*sql*/`
                INSERT INTO todos (user_id, task)
                VALUES (?, ?)
            `)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        // create a token
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.json({ token })
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }


})
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const getUser = db.prepare(/*sql*/`
                SELECT * FROM users
                WHERE username = ?
            `)
        const user = getUser.get(username)

        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if (!passwordIsValid) {
            return res.status(401).json({ message: 'invalid password' })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })



        res.status(200).json({ token })
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }

})


export default router;