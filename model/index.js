const dbConnection = require('../config/dbConnection');
const dbConnectionTwo = require('../config/dbConnectionTwo');
const db = {};
const dbTwo = {};
db.sequelize = dbConnection;
dbTwo.sequelizeTwo = dbConnectionTwo;

db.user = require('./user');
db.activityLog = require('./activityLog');
db.userAuthSettings = require('./userAuthSettings');
db.userToken = require('./userToken');
db.role = require('./role');
db.projectRoute = require('./projectRoute');
db.routeRole = require('./routeRole');
db.userRole = require('./userRole');
dbTwo.sales_order_item = require('./sales_order_item');


dbTwo.sales_order_item.belongsTo(dbTwo.sales_order_item, {
  foreignKey: 'order_id',
  as: '_order_id',
  targetKey: 'item_id' 
});

module.exports = dbTwo;

db.userAuthSettings.belongsTo(db.user, {
    foreignKey: 'userId',
    as: '_userId',
    targetKey: 'id' 
  });
  db.user.hasMany(db.userAuthSettings, {
    foreignKey: 'userId',
    sourceKey: 'id' 
  });
  db.userAuthSettings.belongsTo(db.user, {
    foreignKey: 'addedBy',
    as: '_addedBy',
    targetKey: 'id' 
  });
  db.user.hasMany(db.userAuthSettings, {
    foreignKey: 'addedBy',
    sourceKey: 'id' 
  });
  db.userAuthSettings.belongsTo(db.user, {
    foreignKey: 'updatedBy',
    as: '_updatedBy',
    targetKey: 'id' 
  });
  db.user.hasMany(db.userAuthSettings, {
    foreignKey: 'updatedBy',
    sourceKey: 'id' 
  });

  db.userToken.belongsTo(db.user, {
    foreignKey: 'userId',
    as: '_userId',
    targetKey: 'id' 
  });
  db.user.hasMany(db.userToken, {
    foreignKey: 'userId',
    sourceKey: 'id' 
  });
  db.userToken.belongsTo(db.user, {
    foreignKey: 'addedBy',
    as: '_addedBy',
    targetKey: 'id' 
  });
  db.user.hasMany(db.userToken, {
    foreignKey: 'addedBy',
    sourceKey: 'id' 
  });
  db.userToken.belongsTo(db.user, {
    foreignKey: 'updatedBy',
    as: '_updatedBy',
    targetKey: 'id' 
  });
  db.user.hasMany(db.userToken, {
    foreignKey: 'updatedBy',
    sourceKey: 'id' 
  });
  db.userRole.belongsTo(db.user, {
    foreignKey: 'userId',
    as: '_userId',
    targetKey: 'id' 
  });
  db.user.hasMany(db.userRole, {
    foreignKey: 'userId',
    sourceKey: 'id' 
  });

  db.routeRole.belongsTo(db.role, {
    foreignKey: 'roleId',
    as: '_roleId',
    targetKey: 'id' 
  });
  db.role.hasMany(db.routeRole, {
    foreignKey: 'roleId',
    sourceKey: 'id' 
  });
  db.userRole.belongsTo(db.role, {
    foreignKey: 'roleId',
    as: '_roleId',
    targetKey: 'id' 
  });
  db.role.hasMany(db.userRole, {
    foreignKey: 'roleId',
    sourceKey: 'id' 
  });
  db.routeRole.belongsTo(db.projectRoute, {
    foreignKey: 'routeId',
    as: '_routeId',
    targetKey: 'id' 
  });
  db.projectRoute.hasMany(db.routeRole, {
    foreignKey: 'routeId',
    sourceKey: 'id' 
  });

module.exports = db;