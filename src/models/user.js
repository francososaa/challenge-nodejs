const { DataTypes, UUID } = require('sequelize');
const sequelize = require('../db/database');
const bcryptjs = require('bcryptjs');

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
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        status: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    hooks: {
        beforeCreate: async function (user) {
            const salt = bcryptjs.genSaltSync(10);
            user.password = await bcryptjs.hashSync(user.password, salt)
        }
    }
}
);

module.exports = User;