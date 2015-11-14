// Server
const Poll    = require("./models/poll")
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

var polls = {}

app.get("/", function (req, res){
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.post("/poll/new", function (req, res) {
  // eval(pry.it)
  var poll       = new Poll(req.body.poll)
  polls[poll.id] = poll
  res.redirect("/poll/" + poll.id)
})

app.get("/poll/:id", function (req, res) {
  var poll = polls[req.params.id]
  res.render("poll", {pollData: poll})
})

app.get("/vote/:voterId", function (req, res) {
  var pollValues = _.values(polls)
  var poll = _.find(pollValues, function(value) {
    return value.voterId === req.params.voterId
  })
  res.render("vote", {pollData: poll})
})

if (!module.parent) {
  http.listen(process.env.PORT || 3000, function(){
    console.log("Your server is up and running on Port 3000. Good job!")
  })
}

module.exports = app
