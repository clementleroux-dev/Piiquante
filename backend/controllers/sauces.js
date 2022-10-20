//// IMPORT ////
// Data schema
const Sauces = require("../models/sauces");
// File system package
const fs = require("fs");

//// CONTROLLERS POST - CREATE ////
exports.createSauces = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.sauce); // extract data from body request
  delete saucesObject._id; // delete id from Mongo DB
  delete saucesObject._userId;
  const sauce = new Sauces({
    ...saucesObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//// CONTROLLERS GET - ONE ////
exports.getSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

//// CONTROLLERS GET - ALL ////
exports.getAllSauces = (req, res, next) => {
  Sauces.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

//// CONTROLLERS PUT- MODIFY ////
exports.modifySauces = (req, res, next) => {
  const saucesObject = req.file //check if img exist and create object
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete saucesObject._userId;
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => {
      if (sauces.userId != req.auth.userId) {
        //Only sauce create by user itself can be delete
        res.status(401).json({ error: "Not authorized" });
      } else {
        Sauces.updateOne(
          { _id: req.params.id }, //comparision object
          { ...saucesObject, _id: req.params.id } // new object
        )
          .then(() => res.status(200).json({ error: "Objet modifié!" }))
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

//// CONTROLLERS DELETE ////
exports.deleteSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => {
      if (sauces.userId != req.auth.userId) {
        //Only sauce create by user itself can be delete
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = sauces.imageUrl.split("/images/")[1]; ////extract img from irl
        fs.unlink(`images/${filename}`, () => {
          //delete img
          Sauces.deleteOne({ _id: req.params.id }) //delete object from DB
            .then(() => {
              res.status(202).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(500).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

//// CONTROLLERS LIKE ////
exports.likeSauces = (req, res, next) => {
  Sauces.findById(req.params.id)
    .then((sauce) => {
      let userId = req.body.userId;
      let usersLiked = sauce.usersLiked;
      let usersDisliked = sauce.usersDisliked;

      switch (req.body.like) {
        case 1: //like
          usersLiked.includes(userId) == false
            ? usersLiked.addToSet(userId)
            : "";
          usersDisliked = usersDisliked.filter((el) => el !== req.userId);
          break;

        case -1: // don't like
          usersDisliked.includes(userId) == false
            ? usersDisliked.addToSet(userId)
            : "";
          usersLiked = usersLiked.filter((el) => el !== userId);
          break;

        case 0:
          usersLiked = usersLiked.filter((el) => el !== userId);
          usersDisliked = usersDisliked.filter((el) => el !== userId);
          break;
        default:
          throw res.status(400).json({ err });
      }
      const likes = usersLiked.length;
      const dislikes = usersDisliked.length;

      sauce
        .updateOne({
          usersLiked: usersLiked,
          usersDisliked: usersDisliked,
          likes: likes,
          dislikes: dislikes,
        })
        .then(() => {
          res.status(200).json({ message: "like ajouté" });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
