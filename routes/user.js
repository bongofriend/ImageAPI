const db = require("../database/userqueries");
const Promise = require("bluebird");

exports.postUser = function(req,res){
    let username = req.body.username;
    let password = req.body.password;
    console.log(username + " " + password);
    db.insertUser(username,password)
    .then((isSuccess) => {
        if (isSuccess) {
            console.log("Inserted User " + username + " into Database");
            res.json({
                Status: "Ok",
                Message: "Inserted User " + username + " into Database"
            })
        }
        else {
            console.log("Could Not Insert User " + username + " into Database");
            res.json({
                Status: "Error",
                Message: username + " already in use"
            })
        }
    })
    .catch((err) => {
        console.log("Could Not Insert User " + username + " into Database");
        res.json({
            Status: "Error",
            Message: "Could Not Insert User " + username + " into Database"
        })
    })
}