const express = require('express');
const path = require('path');
const routes = require('./controllers');
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/date');
require('dotenv').config();

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const hbs = exphbs.create({ helpers }) 

// set up session with cookies
const sess = {
  secret: process.env.DB_SECRET,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess))

// Setting up handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// middleware for using the routes in the controller folder
app.use(routes);

// start server to begin listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});