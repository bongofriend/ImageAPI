const uuid = require("uuid/v4");
const Clients = require("./dbconnection").Clients;
const Promise = require("bluebird");

var getClientByID = function(clientid){
    return Clients.findOne({ where: {ClientID: clientid} })
};

var getClientByKey = function(apikey){
    return Clients.findOne({where: {APIKey: apikey}})
};

var insertClient = function(clientid,user){
    return new Promise((resolve,reject) => {
        getClientByID(clientid)
        .then((result) => {
            if (result) return resolve(false)
            Clients.create({
                ClientID: clientid,
                User: user,
                APIKey: ""
            })
            .then((ins) => {return resolve(ins)})
            .catch((err) => {return reject(err)})
        })
        .catch((err) => {return reject(err)})
    })
}

module.exports = {
    getClientByID: getClientByID,
    getClientByKey: getClientByKey,
    insertClient: insertClient
}