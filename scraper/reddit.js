const axios = require('axios')
const Promise = require("bluebird");
const ImageModel = require("./models/imagemodel")

const limit = 50

class RedditScraper{

    _buildRedditURL(sub){
        return "http://reddit.com/r/" + sub + ".json&limit=" + limit
    }

    _getRedditJson(subreddit){
        return new Promise((resolve,reject) => {
            axios.get(this._buildRedditURL(subreddit))
            .then(res =>{
                if(res) return resolve(res.data.data.children);
                return resolve(false)
            })
            .catch(err => {return reject(err)})
        })
    }

    _parseRedditJson(json){
        return new Promise((resolve,reject) => {
            let models = [];
            for(var s of json){
                if(s.data.url.endsWith(".jpg") || s.data.url.endsWith(".png")){
                    let url = s.data.url
                    let title = s.data.title
                    let thumb = s.data.preview.images[0].resolutions[1].url
                    let biggerThumb = s.data.preview.images[0].resolutions[2].url
                    models.push(new ImageModel(title,url,thumb,biggerThumb))
                }
            }
            return resolve(models)
        })
    }
    getImages(subreddit){
        return new Promise((resolve,reject) => {
            this._getRedditJson(subreddit)
            .then(json => {
                this._parseRedditJson(json)
                .then((result) => {return resolve(result)})
                .catch((err) => {return reject(err)})
            })
            .catch(err => {return reject(err)})
        })
        
    }
}

module.exports = RedditScraper