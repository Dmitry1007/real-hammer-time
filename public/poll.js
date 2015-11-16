socket.on("clickVote", function (poll) {
  $('span').each(function(index, element) {
    element.innerText = poll.pollData.responsesAndVotes[element.id]
  })
  $('.card-title').text(poll.pollData.title)
});
