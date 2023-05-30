
/**
 * dbConnection.js
 * @description :: database connection using sequelize
 */

const {
    Sequelize, DataTypes 
  } = require('sequelize');
  const dbConfig = require('./db');
  
  const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: false,
  });

  sequelize.authenticate().then(() => {
    console.log('Connection DB');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = sequelize ;
  