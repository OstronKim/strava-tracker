const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");

const User = require("../models/user.model");

// @route POST users/register
// @desc Register user
// @access Public

router.post("/register", (req, res) => {
  //form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        clientID: req.body.clientID,
        clientSecret: req.body.clientSecret,
        refreshToken: req.body.refreshToken,
      });

      //Hash the password before saving it in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST users/login
// @desc Login user and return JWT token
// @access Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.status(404).json({ usernameNotFound: "Username not found" });
    }

    //check and compare password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username,
          clientID: user.clientID,
          clientSecret: user.clientSecret,
          refreshToken: user.refreshToken,
        };

        jwt.sign(
          payload,
          process.env.SECRETORKEY,
          { expiresIn: 31556926 }, //1 year in seconds
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "password incorrect" });
      }
    });
  });
});

module.exports = router;
