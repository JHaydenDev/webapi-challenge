const express = require("express");

const Project = require("../data/helpers/projectModel");

const router = express.Router();

//Get request.
router.get("/", (req, res) => {
  Project.get()
    .then(project => res.status(200).json(project))
    .catch(err =>
      res.status(500).json({ message: "YOU CANT HAVE THE PROJECT!" })
    );
});

module.exports = router;
