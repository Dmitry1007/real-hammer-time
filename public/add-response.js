var responseCount = 0
$("#response-btn").on("click", function() {
  responseCount++
  $("form .row").append(
    `<div class="new input-field col s12">
      <i id="remove-response-icon" class="remove-icon material-icons prefix tooltipped" data-position="right" data-delay="50" data-tooltip="Remove Response">no_sim</i>
      <input id="poll_response${responseCount} input_text" type="text" class="validate" name="poll[responses][]" length="20">
      <label for="poll_response${responseCount}">Response</label>
     </div>`
    )
  $(".tooltipped").tooltip({delay: 50})
  $("input").characterCounter();
})

$("form .row").on("click", function(event) {
  if ($(event.target).hasClass('remove-icon')) {
    $('.material-tooltip').remove()
    event.target.parentElement.remove()
  }
});

$("#form").submit(function() {
  var pollTitle = document.getElementById("poll_title input_text").value
  var pollQuestion = document.getElementById("poll_question input_text").value
  var pollResponse = document.getElementById("poll_response input_text").value

  if (pollTitle == "" || pollQuestion == "" || pollResponse == "") {
      alert("you did not fill out one of the fields")
      return false
  }
});
