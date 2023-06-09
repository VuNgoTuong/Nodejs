/**
 * authController.js
 * @description :: exports authentication methods
 */
const authService = require("../../services/auth");
const model = require("../../model/index");
const dbService = require("../../utils/dbService");
const dayjs = require("dayjs");
const userSchemaKey = require("../../utils/validation/userValidation");
const validation = require("../../utils/validateRequest");
const authConstant = require("../../constants/authConstant");
const { uniqueValidation } = require("../../utils/common");
const {
  sendPasswordBySMS,
  sendPasswordByEmail,
} = require("../../services/auth");
const jwt = require("jsonwebtoken");

/**
 * @description : user registration
 * @param {Object} req : request for register
 * @param {Object} res : response for register
 * @return {Object} : response for register {status, message, data}
 */
const register = async (req, res) => {
  try {
    let dataToRegister = req.body;
    dataToRegister = {
      ...dataToRegister,
      userType: authConstant.USER_TYPES.Admin,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToRegister,
      userSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }
    let isEmptyPassword = false;
    if (!dataToRegister.password) {
      isEmptyPassword = true;
      //Không set lại mật khẩu ramdom.
      //dataToRegister.password = Math.random().toString(36).slice(2);
    }
    let unique = await uniqueValidation(model.user, dataToRegister);
    if (!unique) {
      return res.validationError({
        message: "User Registration Failed, Duplicate Data found.",
      });
    }
    const result = await dbService.createOne(model.user, {
      ...dataToRegister,
    });
    //   if (isEmptyPassword && req.body.email){
    //     await sendPasswordByEmail({
    //       email: req.body.email,
    //       password: req.body.password
    //     });
    //   }
    //   if (isEmptyPassword && req.body.mobileNo){
    //     await sendPasswordBySMS({
    //       mobileNo: req.body.mobileNo,
    //       password: req.body.password
    //     });
    //   }
    return res.success({ data: result });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : login with username and password
 * @param {Object} req : request for login
 * @param {Object} res : response for login
 * @return {Object} : response for login {status, message, data}
 */
const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    if (username && password) {
      let roleAccess = false;
      if (req.body.includeRoleAccess) {
        roleAccess = req.body.includeRoleAccess;
      }
      let result = await authService.loginUser(
        username,
        password,
        authConstant.PLATFORM.ADMIN,
        roleAccess
      );
      if (result.flag) {
        return res.badRequest({ message: result.data });
      }
      return res.success({
        data: {
          id: result.data.id,
          access_token: result.data.token,
          refresh_token: result.data.reftoken,
        },
        message: "Login successful.",
      });
    } else {
      return res.badRequest();
    }
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : login with username and password
 * @param {Object} req : request for login
 * @param {Object} res : response for login
 * @return {Object} : response for login {status, message, data}
 */

const refreshToken = async (req, res) => {

  const token = req.headers.authorization.split(" ")[1];
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace("-", "+").replace("_", "/");
  let user = JSON.parse(Buffer.from(base64, "base64").toString("binary"));

  try {
    let newAccessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,                
      },
      authConstant.JWT.ADMIN_SECRET,
      { expiresIn: authConstant.JWT.EXPIRES_IN * 6 }
    );

    let expire = dayjs().add(authConstant.JWT.EXPIRES_IN, "second").toISOString();
    await dbService.createOne(model.userToken, {
      userId: user.id,
      token: newAccessToken,
      tokenExpiredTime: expire,
    });

    return res.success({
      data: {
        access_token: newAccessToken,
      },
      message: "Create access token successful.",
    });
  } catch (error) {
    return res.internalServerError({ data: error.message });
  }
};


module.exports = {
  register,
  login,
  refreshToken,
};
