const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./routes/user");
const clientController = require("./routes/client");
const authController = require("./routes/auth");
const passport = require("passport");

const port = 3000;
const app = express();
const router = express.Router();

//Set up needed middle ware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());



router.route("/user").post(userController.postUser);

router.route("/client").post(authController.isAuthenticated,clientController.postClient);
//TODO: Add image routing

app.use("/api",router);

app.listen(port,function(err){
    if (err){
        console.log(err);
    } else {
        console.log("Server Listening on Port " + port);
    }
})

