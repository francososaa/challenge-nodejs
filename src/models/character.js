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
     },
    img: { 
        type: DataTypes.STRING,
    },
    age: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: { 
        type: DataTypes.DOUBLE, 
        allowNull: false,
    },
    history: { 
        type: DataTypes.TEXT, 
        allowNull: false,
     },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
        timestamps: false
    }
);

module.exports = Character;