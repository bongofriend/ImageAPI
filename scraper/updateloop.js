const RedditScraper = require("./reddit");
const poster = require("./poster");
const Promise = require("bluebird");

const subs = ["earthporn"]
const reddit = new RedditScraper()
var timerID
const intervall = 3600000


exports.initLoop = function(){
    return new Promise((resolve,reject) => {
        imageLoop();
        timerID = setInterval(imageLoop,intervall)
        return resolve(true)
    })
}

exports.cancelLoop = function(){clearInterval(timerID)}

var imageLoop = function(){
        for(var s of subs){
        reddit.getImages(s)
        .then((models) => {
                console.log(models.length + " Images")
                for(var i of models)
                    poster.postImage(i,"Reddit")
            })
        }
}