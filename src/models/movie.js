const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');


const Movie = sequelize.define('movie',
    {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tittle: { 
        type: DataTypes.STRING,
        allowNull: false,
     },
    img: { 
        type: DataTypes.STRING,
    },
    creation_date: { 
        type: DataTypes.STRING, 
        allowNull: false
    },
    qualification: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
);

module.exports = Movie;