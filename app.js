const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./routes/user");

const port = 3000;
const app = express();
const router = express.Router();

//Set up needed middle ware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router.route("/user").post(userController.postUser);

app.use("/api",router);

app.listen(port,function(err){
    if (err){
        console.log(err);
    } else {
        console.log("Server Listening on Port " + port);
    }
})

