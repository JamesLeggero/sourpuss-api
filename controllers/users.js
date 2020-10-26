const express = require('express')
const router = express.Router();
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const passport = require('../config/passport.js')
const config = require('../config/config.js')
const User = require('../models/user.js')

router.get('/', (req, res) => {
  User.find({}, (error, allUsers) => {
    error ? res.status(404).json(error) :
      res.status(200).json(allUsers)
  })
})



router.post("/signup", (req, res) => {
  console.log(req.body);
  if (req.body.username && req.body.password) {

    // Hash the password:
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );

    User.findOne({ username: req.body.username }, (user) => {
      console.log("========findOne=======", user);
      if (!user) {
        console.log("Running create user");
        User.create(req.body, (error, createdUser) => {
          if (error) res.status(401).json(error);
          if (createdUser) {
            let payload = {
              id: createdUser.id,
            };
            console.log(payload);
            let token = jwt.encode(payload, config.jwtSecret);
            console.log(token);
            res.json({
              token: token,
              id: createdUser._id
            });
          } else {
            console.log("failed to create user");
            res.status(401).json(error);
          }
        });
      } else {
        console.log("User already exists, try logging in instead");
        res.status(401).json(error);
      }
    });
  } else {
    res.status(401).json(error);
  }
});
//
router.post("/login", (req, res) => {
  if (req.body.username && req.body.password) {
    console.log(req.body.username);
    User.findOne({ username: req.body.username }, (error, user) => {
      if (error) res.status(401).json(error);
      if (user) {
        console.log("Found user. Checking password...");
        if (bcrypt.compareSync(req.body.password, user.password)) {
          console.log("Password correct, generating JWT...");
          let payload = {
            id: user.id,
            username: user.username
          };
          let token = jwt.encode(payload, config.jwtSecret);
          console.log(token);
          res.json({
            token: token,
            id: user._id,
          });
        } else {
          console.log("Wrong password");
          res.status(401).json(error);
        }
      } else {
        console.log("Couldn't find user. Try signing up.");
        res.status(401).json(error);
      }
    });
  } else {
    res.status(401).json(error);
  }
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (error, foundUser) => {
      error ? res.status(404).json(error) : res.status(200).json({username: foundUser.username,
      _id: foundUser.id});

  });
})



module.exports = router