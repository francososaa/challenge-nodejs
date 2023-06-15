const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');


const Movie = sequelize.define('movie',
    {
    idMovie: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tittle: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            msj: 'Please enter your tittle' 
        }
     },
    img: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    creation_date: { 
        type: DataTypes.DATEONLY, 
        defaultValue: DataTypes.NOW
    },
    qualification: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1,
            max: 5,
            notEmpty: true,
            msg: "Please enter a rating between 1 and 5"
        }
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
        timestamps: false,
        createdAt: false,
    }
);

module.exports = Movie;