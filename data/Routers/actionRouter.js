const express = require("express");

const Action = require("../data/helpers/actionModel");

//Get request
router.get("/", (req, res) => {
  Action.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "ERROR" });
    });
});

//Get by ID with validation middleware
router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  res.status(200).json(req.user);
});

//Post with validation.
router.post("/:id", validateUserId, (req, res) => {
  const post = { ...req.body, project_id: req.user.project_id };

  Action.insert(post)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => res.status(500).json({ message: "ERROR WITH ACTION!" }));
});

//ID Validation middleware
function validateUserId(req, res, next) {
  const id = req.params.id;
  Action.get(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res
          .status(400)
          .json({ message: "YOU ARE NOT A REAL USER WITH AN ID@" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "THIS ID IS NOT A THING!" });
    });
}

const router = express.Router();
module.exports = router;
