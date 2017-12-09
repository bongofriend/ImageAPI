const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./routes/user");
const clientController = require("./routes/client");
const authController = require("./routes/auth");
const imageController = require("./routes/image");
const passport = require("passport");
const updateloop = require("./scraper/updateloop");

const port = 3000;
const app = express();
const router = express.Router();

//Set up needed middle ware
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

router.route("/user").post(userController.postUser);

router.route("/client").post(passport.authenticate("userAuth"), clientController.postClient);
router.route("/image").post(passport.authenticate("post"), imageController.postImage);
router.route("/image").get(passport.authenticate("get"), imageController.getImage);
//TODO: Add image routing

app.use("/api", router);

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        updateloop.initLoop()
        console.log("Server Listening on Port " + port);
    }
})
