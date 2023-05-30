
/**
 * dbConnection.js
 * @description :: database connection using sequelize
 */

const {
    Sequelize, DataTypes 
  } = require('sequelize');
  // const dbConfig = require('./db');
  
  const sequelizeTwo = new Sequelize(process.env.ECOM_DATABASE_NAME,
    process.env.ECOM_DATABASE_USERNAME, process.env.ECOM_DATABASE_PASSWORD, {
    host: process.env.ECOM_HOST,
    dialect: 'mysql',
    port: 3306,
    logging: false,
  });


  sequelizeTwo.authenticate().then(() => {
    console.log('Connection DB Ecom');
  }).catch(err => {
    console.error('Unable to connect to the database ecom:', err);
  });

  module.exports = sequelizeTwo ;
  