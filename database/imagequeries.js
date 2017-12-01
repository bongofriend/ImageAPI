const Images = require("./dbconnection").Images;
const Promise = require("bluebird");

const insertImage = function (title, url, thumb, source, key,bigger) {
    return new Promise((resolve, reject) => {
        Images.create({
                Title: title,
                Url: url,
                Thumbnail: thumb,
                Source: source,
                BiggerThumb: bigger,
                ClientID: "",
                Date: ""
            }, {
                apikey: key
            })
            .then((ins) => {
                if (!ins) return resolve(false);
                return resolve(true);
            })
            .catch((err) => {
                console.log(err);
                return reject(err)
            })
    })
}

const getImages = function (date) {
    return Images.findAll({
        where: {
            Date: date
        },
        attributes: ["Url", "Thumbnail", "Title"]
    })
}

module.exports = {
    insertImage: insertImage,
    getImages: getImages
}