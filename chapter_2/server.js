const express = require('express')
const app = express()
const PORT = 8383

const data = [{
    name: "Joh Doe",
    age: 25
}]

// Middleware
app.use(express.json())

// Website endpoints
app.get('/', (req, res) => {
    res.status(200).send("<h1>Home page</h1>")
})

app.get('/dashboard', (req, res) => {
    res.status(200).send("Dashboard page")
})

// API endpoints
app.get('/api/data', (req, res) => {
    res.status(200).json(data)
})

app.post('/api/data', (req, res) => {
    const newEntry = req.body
    data.push(newEntry)
    res.status(201).json(data)
})

app.delete('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) return res.status(400).send("ID must be a number")

    let selectedData = data[id]
    if (!selectedData) return res.status(404).send("data not found")

    data.splice(id, 1)
    res.status(200).json(data)
})

app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}`)
})