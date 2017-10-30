const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const CustomStrategy = require("passport-custom")
const User = require("../database/userqueries");
const Clients = require("../database/dbconnection").Clients;
const hasher = require("../database/hash");

var userStrategy = new BasicStrategy(function (username, password, done) {
    User.getUser(username)
        .then((user) => {
            if (!user) return done(null, false)
            hasher.compare(password, user.Password)
                .then((isMatch) => {
                    if (isMatch)
                        return done(null, user);
                    else
                        return done(null, false);
                })
        })
        .catch((err) => {
            return done(err, null)
        })

})

//Passport Strategy to verify the existence of a API Key
var postStrategy = new CustomStrategy(
    function (req, cb) {
        let key = req.body.apikey;
        Clients.findOne({
                where: {
                    APIKey: key
                }
            })
            .then((instance) => {
                if (!instance) return cb(null, false);
                return cb(null, instance);
            })
            .catch((err) => {
                return cb(err, null);
            })
    }
)

var getStrategy = new CustomStrategy(
    function (req, cb) {
        let key = req.query.apikey;
        Clients.findOne({
                where: {
                    APIKey: key
                }
            })
            .then((instance) => {
                if (!instance) return cb(null, false);
                return cb(null, instance);
            })
            .catch((err) => {
                return cb(err, null);
            })
    }
)


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use("userAuth", userStrategy)
passport.use("post", postStrategy);
passport.use("get", getStrategy);