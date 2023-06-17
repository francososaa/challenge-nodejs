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
        allowNull: false
     },
    email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
        timestamps: false
    }
);

module.exports = User;