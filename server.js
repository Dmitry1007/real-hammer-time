const Poll       = require("./lib/poll")
const _          = require("lodash")
const pry        = require("pryjs")
const express    = require("express")
const app        = express()
const http       = require("http").Server(app)
const io         = require("socket.io")(http)
const path       = require("path")
const bodyParser = require("body-parser")
const helpers    = require("express-helpers")(app)

app.set("view engine", "ejs")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.polls = {}

app.get("/", function (req, res){
  res.render("index")
})

app.post("/poll/new", function (req, res) {
  var poll       = new Poll(req.body.poll)
  app.polls[poll.id] = poll
  res.redirect("/poll/" + poll.id)
})

app.get("/poll/:id", function (req, res) {
  // eval(pry.it)
  var poll = app.polls[req.params.id]
  res.render("poll", {pollData: poll})
})

app.get("/vote/:voterId", function (req, res) {
  var pollValues = _.values(app.polls)
  var poll = _.find(pollValues, function(value) {
    return value.voterId === req.params.voterId
  })
  res.render("vote", {pollData: poll})
})

var server = http.listen(process.env.PORT || 3000, function(){
  console.log("Your server is up and running on Port 3000. Good job!")
})

io.on("connection", function (socket) {
  console.log("A user has connected.", io.engine.clientsCount)
  console.log(socket.id)

  socket.on("closePoll", function (data) {
    var poll = app.polls[data.pollId]
    poll.open = false
    io.sockets.emit("pollClosed", {pollData: poll})
  })

  socket.on("voted", function (data) {
    var poll = app.polls[data.pollId]
    poll.responsesAndVotes[data.response]++
    io.sockets.emit("clickVote", {pollData: poll})
  })

  socket.on("disconnect", function () {
    console.log("A user has disconnected.", io.engine.clientsCount)
  })
})

module.exports = app
