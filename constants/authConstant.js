/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const JWT = {
    ADMIN_SECRET:'dafcjwtadminsecret',
    DEVICE_SECRET:'dafcjwtdevicesecret',
    CLIENT_SECRET:'dafcjwtclientsecret',
    EXPIRES_IN: 10 // set thời gian hết hạn của access token
  };
  
  const USER_TYPES = {
    Admin:1,
    User:2,
  };
  
  const PLATFORM = {
    ADMIN:1,
    DEVICE:2,
    CLIENT:3,
  };
  
  let LOGIN_ACCESS = {
    [USER_TYPES.Admin]:[PLATFORM.ADMIN],        
    [USER_TYPES.User]:[PLATFORM.DEVICE,PLATFORM.CLIENT],        
  };
  
  const MAX_LOGIN_RETRY_LIMIT = 3;
  const LOGIN_REACTIVE_TIME = 20;   
  
  const FORGOT_PASSWORD_WITH = {
    LINK: {
      email: true,
      sms: false
    }
  };
  
  module.exports = {
    JWT,
    USER_TYPES,
    PLATFORM,
    MAX_LOGIN_RETRY_LIMIT,
    LOGIN_REACTIVE_TIME,
    FORGOT_PASSWORD_WITH,
    LOGIN_ACCESS,
  };