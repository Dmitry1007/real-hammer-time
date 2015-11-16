var buttons = document.querySelectorAll("#responses button")

var pollId = $('.poll-data').text()

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    var response = this.innerText.toLowerCase()
    socket.emit("voted", {response: response, pollId: pollId})
  });
}
