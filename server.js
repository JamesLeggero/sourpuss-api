require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('./config/passport')()

const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI

const db = mongoose.connection

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
db.on('open', () => {
    console.log('PUSS'
    // + " " + PORT
    )
})
app.use(cors())
app.use(express.json())
app.use(passport.initialize())

app.use('/gigs', require('./controllers/gigs.js'))

app.listen(PORT, () =>{
    console.log('SOUR')
})