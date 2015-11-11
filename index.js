// Our Server
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/polls/new', function (req, res) {
  res.redirect('/polls/new');
});

app.get('/polls/new', function (req, res) {
  console.log("I'm here!")
})

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
