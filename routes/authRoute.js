const express = require("express");
const routes = express.Router()
const authController = require("../controller/authController");

routes.post("/signup",authController.createUser)

exports.router = routes;
