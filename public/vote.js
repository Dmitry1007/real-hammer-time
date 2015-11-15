var buttons = document.querySelectorAll("#responses button")

var pollId = $('.poll-data').text()

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    // console.log(this.innerText)
    var response = this.innerText
    socket.emit("voted", {response: response, pollId: pollId})
  });
}
