require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db  = require('./db/database');
const dbConfiguration = require('./db/dbConfig');

const authRouter = require('./routes/auth-router');
const movieRouter = require('./routes/movie-router');
const genreRouter = require('./routes/genre-router');
const characterRouter = require('./routes/character-router');


// Initializations
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoints
app.use( '/auth', authRouter );
app.use( '/movies', movieRouter );
app.use( '/genre', genreRouter );
app.use( '/characters', characterRouter );

//DB
dbConfiguration( db, { mockdata: process.env.MOCKDATA } );

// Starting the server
app.listen(process.env.PORT);
console.log(`Server running on port ${process.env.PORT}`);

