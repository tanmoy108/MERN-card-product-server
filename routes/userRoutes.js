const express = require("express");
const routes = express.Router();
const userController = require("../controller/userController");

routes
.get("/",userController.getUser)
.patch("/:id",userController.updateUser)
.delete("/:id",userController.deleteUser)

exports.router = routes