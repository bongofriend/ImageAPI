const db = require("../database/imagequeries");
const Promise = require("bluebird");

exports.postImage = function (req, res) {
    let title = req.body.title;
    let url = req.body.url;
    let thumb = req.body.thumbnail;
    let source = req.body.source;
    let key = req.body.apikey;
    db.insertImage(title, url, thumb, source, key)
        .then((isSuccess) => {
            if (!isSuccess) {
                res.json({
                    Status: "Error",
                    Message: "Could not Insert Image"
                })
            }
            res.json({
                Status: "Ok",
                Message: "Image inserted"
            })
        })
        .catch((err) => {
            res.json({
                Status: "Error",
                Message: "Image already saved"
            })
        })

}

exports.getImage = function (req, res) {
    let date = req.query.date;
    db.getImages(date)
        .then((results) => {
            if (!results)
                res.json({
                    Status: "Error",
                    Message: "Could not find Images"
                })
            res.json({
                Status: "Ok",
                data: results
            })
        })
        .catch((err) => {
            res.json({
                Status: "Error",
                Message: "An Error Occured"
            })
        })

}