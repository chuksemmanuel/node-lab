import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import express from 'express'

import authRoute from './routes/authRoutes.js'
import todoRoute from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express();
const PORT = process.env.PORT || 5000

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
// Get the directory naem from the file path
const __dirname = dirname(__filename)

// console.log('import.meta.url:', import.meta.url, '\n',)
// console.log('__filename:', __filename, '\n',)
// console.log('__dirname: =>', __dirname, '\n',)

// Middlewares
app.use(express.json()) // allows json in req.body

/* Tell express to serve all fiels from the public folder as static assets. Any request for the css fiels will be resolved to the /public directory */
app.use(express.static(path.join(__dirname, '../public'))) // makes ../public become /public

// Serving up the HTML file from the /public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


// Routes
app.use('/auth', authRoute)
app.use('/todos', authMiddleware, todoRoute)

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})