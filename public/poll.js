socket.on("clickVote", function (poll) {
  var pollObject = poll

  $('span').each(function(index, element) {
    element.innerText = pollObject.responsesAndVotes[element.id]
  })
});
