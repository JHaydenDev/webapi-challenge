const express = require("express");

const db = require("../helpers/actionModel.js");

const server = express.Router();

server.use(express.json());

//Get request
server.get("/", (req, res) => {
  Action.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "ERROR" });
    });
});

//Get by ID with validation middleware
server.get("/:id", validateActionId, (req, res) => {
  const id = req.params.id;
  res.status(200).json(req.user);
});

//Post with validation.
server.post("/:id", validateActionId, (req, res) => {
  const post = { ...req.body, project_id: req.user.project_id };

  Action.insert(post)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => res.status(500).json({ message: "ERROR WITH ACTION!" }));
});

//Put with validation
server.put("/:id", validateActionId, (req, res) => {
  const postBody = { ...req.body, project_id: req.action.project_id };
  const id = req.params.id;
  console.log(postBody);
  Action.update(id, postBody)
    .then(action => {
      res.status(200).json({ message: "UPDATE WORKED!" });
    })
    .catch(err => res.status(500).json({ message: "UPDATE DIDNT WORK!" }));
});

//Delete with validation
server.delete("/:id", validateActionId, (req, res) => {
  const id = req.params.id;
  Action.remove(id)
    .then(action => res.status(200).json({ message: "YOU DELETED IT!" }))
    .catch(err => res.status(500).json({ message: "DELETE DIDNT WORK!" }));
});

//ID Validation middleware
function validateActionId(req, res, next) {
  const id = req.params.id;
  Action.get(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res
          .status(400)
          .json({ message: "YOU ARE NOT A REAL USER WITH AN ID!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "THIS ID IS NOT A THING!" });
    });
}


module.exports = server;
