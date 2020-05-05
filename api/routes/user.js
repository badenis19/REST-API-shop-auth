const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user')

// ALL 
router.get('/', (req, res, next) => { // only '/' needed because it will already have /products from app.js
  User.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        user: docs
      }
      console.log(docs)
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "err" });
    })

})

// Create new user
router.post('/signup', (req, res, next) => {
  User.find({ email: req.body.email }) // to check if user exists before creating new one
    .exec()
    .then(user => {
      if (user.length >= 1) { // to only create new user if email doesn't already exist
        console.log('Mail already exists')
        return res.status(409).json({
          message: 'Mail already exists'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => { // bcrypt.hash(password, salting) salting to make password more secure. 10 is safe.
          if (err) {
            console.log(err)
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            })

            user.save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'Created user successfully',
                  createdUser: {
                    email: result.name,
                    _id: result._id,
                  }
                })
              })
              .catch(err => {
                console.log(err)
                res.status(500).json({ error: "err" });
              })
          }
        })
      }
    })
})

// Create token
router.post('/login', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) { // check if user exists
        return res.status(401).json({
          message: "Auth failed"
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => { // check if password is correct. compare given password with one stored in DB.
        if (err) {
          console.log(err)
          return res.status(401).json({
            message: "Auth failed"
          })
        }

        if (result) { // To add token and return it to the user
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          )

          console.log("Auth successful")
          console.log(token)

          return res.status(200).json({
            message: "Auth successful",
            token: token
          })
        } else {
          console.log("Auth failed")
          return res.status(401).json({
            message: "Auth failed"
          })
        }
      })
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
})





// Delete
router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleled"
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
})

module.exports = router;

