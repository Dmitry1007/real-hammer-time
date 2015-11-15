socket.on("clickVote", function (vote) {
  console.log('hello')
  var clickVote = document.getElementById(vote);
  clickVote.innerText = vote;
});
