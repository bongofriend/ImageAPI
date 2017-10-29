const Sequelize = require("sequelize");
const tables = require("./tables");
const Promise = require("bluebird");
const hasher = require("./hash");
const uuid = require("uuid/v4");

const rounds = 10;

//Database configuration
const _config = {
    host: "localhost",
    user: "root",
    password: "mertos2001",
    database: "imageapi"
};


const db = new Sequelize(_config.database,_config.user,_config.password,{
    host: _config.host,
    dialect: "mysql"
});

//Test if db is online
db.authenticate()
.then(() => {console.log("Connection To Database etablished")})
.catch((err) => {console.error("Could not Connect to Database")});

//Define needed Models
const Users = db.define("Users",tables.userSchema,{
    timestamps: false
});

const Clients = db.define("Clients",tables.clientSchema,{
    timestamps: false
});

Users.beforeCreate(function(user,options){
    return hasher.hash(user.Password)
    .then((hash) => {
        user.Password = hash;
    })
    .catch((err) => {
        console.error("Error during Hashing");
    })
});


Clients.beforeCreate(function(client,options){
    client.APIKey = uuid();
})

module.exports = {
    Users: Users,
    Clients: Clients
}