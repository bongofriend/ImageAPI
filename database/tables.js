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
};

const imageSchema = {
    Title: {
        type: sequelize.STRING,
        allowNull: false
    },
    Url: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    Thumbnail: {
        type: sequelize.STRING,
        allowNull: false
    },
    Source: {
        type: sequelize.STRING,
        allowNull: false
    },
    Date: {
        type: sequelize.STRING,
        allowNull: false
    },
    ClientID: {
        type: sequelize.STRING,
        allowNull: false
    }
}
module.exports = {
    userSchema: userSchema,
    clientSchema: clientSchema,
    imageSchema: imageSchema
};