const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Character = require('../models/character');
const Movie = require('../models/movie');

const CharacterMovies = sequelize.define('CharacterMovies',
    {
    characterId: {
        type: DataTypes.INTEGER,
        references: {
            model: Character,
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

module.exports = CharacterMovies;