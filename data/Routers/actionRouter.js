const express = require("express");

const Action = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  Action.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "ERROR" });
    });
});

const router = express.Router();
module.exports = router;
