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
            },
        },
        creationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
            }
        },
        qualification: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
                isInt: true,
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

module.exports = Movie;