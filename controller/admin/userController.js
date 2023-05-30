/**
 * userController.js
 * @description :: exports action methods for user.
 */

const { Op } = require("sequelize");
const User = require("../../model/user");
const userSchemaKey = require("../../utils/validation/userValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const auth = require("../../services/auth");
const models = require("../../model");
const { verify } = require("jsonwebtoken");
// const deleteDependentService = require('../../utils/deleteDependent');

/**
 * @description : get information of logged-in User.
 * @param {Object} req : authentication token is required
 * @param {Object} res : Logged-in user information
 * @return {Object} : Logged-in user information {status, message, data}
 */
const getLoggedInUserInfo = async (req, res) => {
  try {
    if (!req.user && !req.user.id) {
      return res.unAuthorized();
    }
    const query = {
      id: req.user.id,
      isDeleted: false,
    };
    // console.log(query); // querry id user
    query.isActive = true;
    let result = await dbService.findOne(User, query);
    if (!result) {
      return res.recordNotFound();
    }
    return res.success({ data: result });
  } catch (error) {
    return res.internalServerError({ data: error.message });
  }
};


module.exports = {
  getLoggedInUserInfo
};
