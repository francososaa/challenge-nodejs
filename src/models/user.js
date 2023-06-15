const { DataTypes, UUID } = require('sequelize');
const sequelize = require('../db/database');


const User = sequelize.define('user',
    {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
            msj: 'The username must be a valid email' 
        } 
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: true
        } 
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
        timestamps: false
    }
);

module.exports = User;