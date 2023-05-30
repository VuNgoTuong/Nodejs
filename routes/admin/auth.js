/**
 * auth.js
 * @description :: express routes of authentication APIs
 */

const express = require("express");
const routes = express.Router();
const authController = require("../../controller/admin/authController");
const { PLATFORM } = require("../../constants/authConstant");
const auth = require("../../middleware/auth");


routes.route("/register").post(authController.register);
routes.post("/login", authController.login);
routes.post("/refresh_Token", authController.refreshToken); 



module.exports = routes;
