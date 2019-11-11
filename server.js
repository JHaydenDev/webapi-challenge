const express = require("express");
const server = express();
const projectRouter = require("./data/Routers/projectRouter.js");
const actionRouter = require("./data/Routers/actionRouter.js");
server.use(express.json());
server.use(logger);
// server.use("/actions", actionRouter);
// server.use("/projects", projectRouter);
server.get("/", (req, res) => {
  res.status(200).json({ message: "Lets get this thing started!" });
});

//custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );

  next();
}

module.exports = server;
