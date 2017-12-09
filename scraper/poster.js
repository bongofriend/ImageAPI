const axios = require("axios");
const Promise = require("bluebird")

const host = "http://localhost:3000/api/image"
const apikey = "c3068d79-355e-47d2-a9a7-b7a6d81c3343gi"
exports.postImage = function(model,source){
    new Promise((resolve,reject) => {
        axios.post(host,{
            title: model.title,
            url: model.url,
            thumbnail: model.thumb,
            bigger: model.biggerthumb,
            source: source,
            apikey: apikey
        })
        .then((response) => {
            if(response)
                return resolve(true)
            return resolve(false)
        })
        .catch(err => {return reject(err)})
    })
}