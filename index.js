// Our Server
pry = require("pryjs")
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const crypto = require('crypto');

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set('view engine', 'ejs')

app.get("/", function (req, res){
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

var polls = {}

app.post("/polls/new", function (req, res) {
  var poll      = req.body.poll;
  var id        = crypto.randomBytes(10).toString("hex");

  poll.id       = id;
  poll.voterId  = crypto.randomBytes(10).toString("hex");
  // poll.voterUrl = "/vote/" + voterId;

  polls[id] = poll;
  res.redirect("/polls/" + id);
});

app.get("/polls/:id", function (req, res) {
  var poll = polls[req.params.id];
  res.render('poll', {pollData: poll})
  // eval(pry.it)
})

http.listen(process.env.PORT || 3000, function(){
  console.log("Your server is up and running on Port 3000. Good job!");
});
