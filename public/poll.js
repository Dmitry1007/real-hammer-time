socket.on("clickVote", function (poll) {
  $('span').each(function(index, element) {
    element.innerText = poll.pollData.responsesAndVotes[element.id]
  })
});

$("#close-poll-btn").on("click", function () {
  var pollId = $('.poll-data').text()
  socket.emit("closePoll", {pollId: pollId})

  $("#close-poll-btn").text("Poll Closed").prop("disabled", true)
})
