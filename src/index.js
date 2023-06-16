require('dotenv').config();
require('./models/index');
const express = require('express');
const cors = require('cors');
const sequelize  = require('./db/database');
const authRouter = require('./routes/auth-router');

// Initializations
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoints
app.use( '/auth', authRouter );

//DB
( async () => { await sequelize.sync({ force: false }); })();

sequelize.authenticate()
    .then(() => { console.log(('Connected to database successfully'));})
    .catch( err => { console.log('Could not connect to database');});

// Starting the server
app.listen(process.env.PORT);
console.log(`Server running on port ${process.env.PORT}`);

