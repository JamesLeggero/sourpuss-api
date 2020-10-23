const express = require('express')
const router = express.Router();
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const passport = require('../config/passport.js')
const config = require('../config/config.js')
const Gig = require('../models/roaster.js')

router.get('/', (req, res) => {
  Gig.find({}, (error, allGigs) => {
    error ? res.status(404).json(error) :
      res.status(200).json(allGigs)
  })
})

router.post('/', (req, res) => {
    if (req.body.hidden === 'on') {
        req.body.hidden = true
    } else {
        req.body.hidden = false
    }

    Gig.create(req.body, (err, createdGig) => {
        if (err) {
            res.status(500).send({
                error: err.message
            })
        } else {
            res.redirect('/gigs')
        }
    })
})

module.exports = router
