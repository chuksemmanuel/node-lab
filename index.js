import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(8080, () => {
    console.log('App started on port 8080')
})