/**
 * index.js
 * Use `index.js` to run your app.
 * To start the server, run: `node index.js`.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const YAML = require('yamljs');
dotenv.config({ path:'.env' });
global.__basedir = __dirname;
const ejs = require('ejs');
const listEndpoints = require('express-list-endpoints');
const passport = require('passport');
// const seeder = require('./seeders');
//all routes 
const routes =  require('./routes');
//all model
const models = require('./model');
let logger = require('morgan');

const seeder = require('./seeders');

const { adminPassportStrategy } = require('./config/adminPassportStrategy');

const app = express();
app.use(require('./utils/response/responseHandler'));
const httpServer = require('http').createServer(app);

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const corsOptions = { origin: process.env.ALLOW_ORIGIN, };
app.use(cors(corsOptions));

//template engine
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

adminPassportStrategy(passport);

app.use(require('./middleware/activityLog').addActivityLog);
app.get('/', (req, res) => {
    res.render('index');
});

console.log('Connect to DB')
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development' ) {

  models.sequelize.sync({alert: true}).then(()=>{       //alter: true cái này dùng để alter model       
  }).finally(()=>{

    app.use(routes);

    // const allRegisterRoutes = listEndpoints(app);
    // seeder(allRegisterRoutes).then(()=>{console.log('Seeding done.');});
    require('./services/socket/socket')(httpServer);
    httpServer.listen(process.env.PORT,()=>{
      console.log(`your application is running on ${process.env.PORT}`);
    });
  })
}else {
  module.exports = app;
}


