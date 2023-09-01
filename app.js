require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db  = require('./src/db/database');
const dbConfiguration = require('./src/db/dbConfig');

// Initializations
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoints
app.use( '/auth', require('./src/routes/auth-router') );
app.use( '/movies', require('./src/routes/movie-router') );
app.use( '/genre', require('./src/routes/genre-router') );
app.use( '/characters', require('./src/routes/character-router') );

//DB
dbConfiguration( db, { mockdata: process.env.MOCKDATA } );

// Starting the server
app.listen(process.env.PORT);
console.log(`Server running on port ${process.env.PORT}`);

