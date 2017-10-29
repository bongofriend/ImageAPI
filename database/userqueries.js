const Users = require("./dbconnection").Users;
const Promise = require("bluebird");


var insertUser = function(username,password){
   return new Promise(function(resolve,reject){
       getUser(username)
       .then((result) => {
           if (result) return resolve(false);
           Users.create({
               Username: username,
               Password: password
           })
           .then(() => {return resolve(true)})
           .catch((err) => {return reject(err)})
       })
       .catch((err) => {return reject(err)})
   })
}

var getUser = function(username,cb){
    return Users.findOne({ where: {Username: username} })
}

module.exports = {
    insertUser: insertUser,
    getUser: getUser
};