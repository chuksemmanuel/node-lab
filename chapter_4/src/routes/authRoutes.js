import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'
import primsa from '../prismaClient.js'

const router = express.Router()

// Register a new user endpoint /auth/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)





    // encrypt password
    const hashedPassword = bcrypt.hashSync(password)

    // save the new user and hash password to the db
    try {
        const user = await primsa.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        const todo = await prisma.todo.create({
            data: {
                userId: user.id,
                task: 'Hello! Add your first todo!',
            }
        })



        // create a token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.json({ token })
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }


})
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {


        const user = await primsa.user.findUnique({
            where: {
                username
            }
        })

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