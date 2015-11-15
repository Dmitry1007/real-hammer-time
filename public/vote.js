var buttons = document.querySelectorAll("#responses button")

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    // console.log(this.innerText)
    socket.emit("voted", this.innerText)
  });
}
