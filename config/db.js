/**
 * db.js
 * @description :: exports values used to make connection with SQL database
 */

if (process.env.NODE_ENV == 'development') {
  module.exports = {
    HOST: process.env.DEVELOP_HOST,
    USER: process.env.DEVELOP_DATABASE_USERNAME,
    PASSWORD: process.env.DEVELOP_DATABASE_PASSWORD,
    DB: process.env.DEVELOP_DATABASE_NAME,
    dialect: process.env.DIALECT,
    port: process.env.DEVELOP_DB_PORT,
  };
}


if( process.env.NODE_ENV == 'uat') {
  module.exports = {
    HOST: process.env.UAT_HOST,
    USER: process.env.UAT_DATABASE_USERNAME,
    PASSWORD: process.env.UAT_DATABASE_PASSWORD,
    DB: process.env.UAT_DATABASE_NAME,
    dialect: process.env.DIALECT,
    port: process.env.UAT_DB_PORT,
  };
}


if (process.env.NODE_ENV == 'production') {
    module.exports = {
      HOST: process.env.HOST,
      USER: process.env.DATABASE_USERNAME,
      PASSWORD: process.env.DATABASE_PASSWORD,
      DB: process.env.DATABASE_NAME,
      dialect: process.env.DIALECT,
      port: process.env.DB_PORT,
    };
}

  