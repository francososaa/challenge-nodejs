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
        allowNull: false,
        validate: { notEmpty: true}
    },
    creation_date: { 
        type: DataTypes.DATEONLY, 
        defaultValue: DataTypes.NOW
    },
    qualification: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
        timestamps: false,
        createdAt: false,
    }
);

module.exports = Movie;