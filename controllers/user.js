//// IMPORT ////
const bcrypt = require("bcrypt"); //cryptage password
const User = require("../models/User"); // model User
const jwt = require("jsonwebtoken"); // token

//// SIGNUP CONTROLLERS ////
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // Hash password
    .then((hash) => {
      //create new object
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      user //save in DB
        .save()
        .then(() => res.status(201).json({ message: "Nouvel utilisateur" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//// LOGIN CONTROLLERS ////
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        //Check if user exist
        return res.status(404).json({ error: "Utilisateur non trouvé !" }); //user not exist
      }
      bcrypt // compare password
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            //if not OK
            return res.status(400).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            // if OK, create TOKEN Authentification
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
