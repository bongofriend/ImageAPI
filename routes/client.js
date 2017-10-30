const db = require("../database/clientqueries");

exports.postClient = function (req, res) {
    let user = req.user.Username;
    let clientid = req.body.clientid;
    if (!user || !clientid) {
        res.json({
            Status: "Error",
            Message: "Check Username/ID"
        })
    }
    db.insertClient(clientid, user)
        .then((ins) => {
            if (!ins) {
                res.json({
                    Status: "Error",
                    Message: "Could not save Client"
                })
                return;
            }
            console.log("Client Saved");
            res.json({
                Status: "Ok",
                Key: ins.APIKey
            })
        })
}