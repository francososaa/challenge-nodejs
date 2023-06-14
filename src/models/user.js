const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');


const User = sequelize.define('user',
    {
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msj:'Please enter your name' }
        }
     },
    email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msj: 'The username must be a valid email' }
        } 
    },
    password: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
        timestamps: false
    }
);

module.exports = User;