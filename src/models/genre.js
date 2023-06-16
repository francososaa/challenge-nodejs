const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Genre = sequelize.define('genre',
    {
     idGenre: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            msj: 'Please enter your name' 
        }
     },
    img: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
        timestamps: false
    }
);

module.exports = Genre;