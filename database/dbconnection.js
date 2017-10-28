const Sequelize = require("sequelize");
const tables = require("./tables");
const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");

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
const Users = db.define("User",tables.userSchema,{
    timestamps: false
});


Users.beforeCreate(function(Password,options){
    console.log("hashing password")
    return encryptData(Password.Password)
    .then((hash) => {
        console.log(hash)
        Password.Password = hash;
    })
    .catch((err) => {console.error("Could not hash")});
})



var encryptData = function(data){
    return new Promise(function(resolve,reject){
       bcrypt.genSalt(rounds,function(err,salt){
           if (err) return reject(err);
           bcrypt.hash(data,salt,null,function(err,hash){
               if (err) return reject(err);
               return resolve(hash);
           })
       })
    })
}


Users.sync()
module.exports = {
    Users: Users
}