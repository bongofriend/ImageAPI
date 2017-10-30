var Clients = require("./dbconnection").Clients
const uuid = require("uuid/v4");
const Promise = require("bluebird");

var insertClient = function (clientid, user) {
    return new Promise((resolve, reject) => {
        Clients.findOne({
                where: {
                    ClientID: clientid
                }
            })
            .then((result) => {
                if (result) return resolve(false)
                Clients.create({
                        ClientID: clientid,
                        User: user,
                        APIKey: ""
                    })
                    .then((ins) => {
                        return resolve(ins)
                    })
                    .catch((err) => {
                        return reject(err)
                    })
            })
            .catch((err) => {
                return reject(err)
            })
    })
}

module.exports = {
    insertClient: insertClient
}