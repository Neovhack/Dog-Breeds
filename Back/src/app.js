const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dogs = require('./routes/dogs.js');
const temperaments = require('./routes/temperaments.js')


require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(morgan('dev'));

//'https://dog-breeds.up.railway.app'
//http://localhost:80
/* server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://dog-breeds.up.railway.app'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
}); */

server.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://dog-breeds.up.railway.app",
      "https://dog-breeds.up.railway.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);








server.use('/dogs', dogs);
server.use("/temperaments", temperaments)

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
