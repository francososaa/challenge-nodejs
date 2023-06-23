require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db  = require('./db/database');
const dbConfiguration = require('./db/dbConfig');

// Initializations
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoints
app.use( '/auth', require('./routes/auth-router') );
app.use( '/movies', require('./routes/movie-router') );
app.use( '/genre', require('./routes/genre-router') );
app.use( '/characters', require('./routes/character-router') );

//DB
dbConfiguration( db, { mockdata: process.env.MOCKDATA } );

// Starting the server
app.listen(process.env.PORT);
console.log(`Server running on port ${process.env.PORT}`);

