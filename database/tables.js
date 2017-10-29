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

const clientSchema = {
    ClientID: {
        type: sequelize.STRING,
        allowNull: false
    },
    User: {
        type: sequelize.STRING,
        allowNull: false
    },
    APIKey: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true
    }
}

module.exports = {
    userSchema: userSchema,
    clientSchema: clientSchema
};

