/**
 * userValidation.js
 * @description :: validate each post and put request as per user model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { USER_TYPES } = require('../../constants/authConstant');
const { convertObjectToEnum } = require('../common');  

/** validation keys and properties of user */
exports.schemaKeys = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().required(),
  name: joi.string().required(),
  isActive: joi.boolean(),
  addedBy: joi.number().integer().allow(0),
  updatedBy: joi.number().integer().allow(0),
  mobileNo: joi.string().required(),
  isDeleted: joi.boolean(),
  userType: joi.any().required()
}).unknown(true);

/** validation keys and properties of user for updation */
exports.updateSchemaKeys = joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  addedBy: joi.number().integer().allow(0),
  updatedBy: joi.number().integer().allow(0),
  mobileNo: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  userType: joi.any().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of user for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      username: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      addedBy: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      updatedBy: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      userType: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
