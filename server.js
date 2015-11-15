const Poll    = require("./lib/poll")
const _       = require("lodash")
const pry     = require("pryjs")
const express = require("express")
var   app     = express()
const http    = require("http").Server(app)
const io      = require("socket.io")(http)
const path    = require("path")

var helpers = require('express-helpers')(app)

app.set("view engine", "ejs")

const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))

app.polls = {}

app.locals.title = "Make Your Dream Poll";

app.get("/", function (req, res){
  // res.sendFile(path.join(__dirname, "/public/index.html"))
  res.render('index');
})

app.post("/poll/new", function (req, res) {
  var poll       = new Poll(req.body.poll)
  app.polls[poll.id] = poll
  res.redirect("/poll/" + poll.id)
})

app.get("/poll/:id", function (req, res) {
  // console.log(req.params)
  // console.log(req.params.id)
  // console.log(app.polls.testPoll)
  var poll = app.polls[req.params.id]
  res.render("poll", {pollData: poll})
  // response.sendStatus(200);
})

app.get("/vote/:voterId", function (req, res) {
  var pollValues = _.values(app.polls)
  var poll = _.find(pollValues, function(value) {
    return value.voterId === req.params.voterId
  })
  // eval(pry.it)
  res.render("vote", {pollData: poll})
})

if (!module.parent) {
  http.listen(process.env.PORT || 3000, function(){
    console.log("Your server is up and running on Port 3000. Good job!")
  })
}

module.exports = app
