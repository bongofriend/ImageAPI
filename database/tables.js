const sequelize = require("sequelize");

const userSchema = {
    Username: {
        type: sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    Password: {
        type: sequelize.STRING,
        allowNull: false
    }
};

module.exports = {
    userSchema: userSchema
};

