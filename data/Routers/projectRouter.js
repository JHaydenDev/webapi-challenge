const express = require("express");

const Project = require("../helpers/projectModel");

const router = express.Router();

//Get request.
router.get("/", (req, res) => {
  Project.get()
    .then(project => res.status(200).json(project))
    .catch(err =>
      res.status(500).json({ message: "YOU CANT HAVE THE PROJECT!" })
    );
});

//Get by ID
router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.action);
});

//Post request
router.post("/", (req, res) => {
  const body = req.body;
  db.insert(body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json({ error: "NO POST FOR YOU!" });
    });
});

//DELETE
router.delete("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "DELETE DIDNT WORK!" });
    });
});

//PUT
router.put("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  db.update(id, body)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: "CHANGE DIDNT WORK!" });
    });
});

//Validate ID Middleware
function validateProjectId(req, res, next) {
  let id = req.params.id;
  db.get(id)
    .then(actions => {
      if (actions) {
        next();
      } else {
        res.status(400).json({ message: "ID NOT RIGHT!" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "VALIDATE DIDNT WORK!" });
    });
}

module.exports = router;
