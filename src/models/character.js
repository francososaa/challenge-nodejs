const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Character = sequelize.define('character',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 90,
                isInt: true,
            }
        },
        weight: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        history: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        status: { 
            type: DataTypes.BOOLEAN, 
            defaultValue: true 
        },
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
);

module.exports = Character;