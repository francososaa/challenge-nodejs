const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const genre = require('../models/genre');
const Movie = require('../models/movie');

const GenreMovies = sequelize.define('GenreMovies',
    {
    genreId: {
        type: DataTypes.INTEGER,
        references: {
            model: genre,
            key: 'id'
        }
    },
    movieId: { 
        type: DataTypes.STRING,
        references: {
            model: Movie,
            key: 'id'
        }
     },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
);

module.exports = GenreMovies;