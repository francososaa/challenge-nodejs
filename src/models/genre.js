const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Genre = sequelize.define('genre',
    {
     id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
     },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
);

module.exports = Genre;