const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');


const Character = sequelize.define('character',
    {
    idCharacters: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            msj:'Please enter your name' 
        }
     },
    img: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    age: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            inInt: true,
            min: 1,
            max: 100,
            notEmpty: true,
            msg: "Please enter a rating between 1 and 100"
        }
    },
    weight: { 
        type: DataTypes.DOUBLE, 
        allowNull: false,
        validate: {
            isFloat: true
        } 
    },
    history: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: false,
        }
     },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
        timestamps: false
    }
);

module.exports = Character;