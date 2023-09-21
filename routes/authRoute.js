const express = require("express");
const routes = express.Router()
const authController = require("../controller/authController");

routes
.post("/signup",authController.createUser)
.post("/signin",authController.loginUser)

exports.router = routes;
