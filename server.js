const express = require("express");

const server = express();

const actionRouter = require("./data/Routers/actionRouter.js");
const projectRouter = require("./data/Routers/projectRouter");

server.use(express.json());
server.use(logger);
server.use("/actions", actionRouter);
server.use("/projects", projectRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "happy halloween" });
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}
module.exports = server;
