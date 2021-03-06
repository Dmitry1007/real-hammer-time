var responseCount = 0
$("#response-btn").on("click", function() {
  responseCount++
  $("form .row").append(
    `<div class="new input-field col s12">
      <i id="remove-response-icon" class="remove-icon material-icons prefix tooltipped" data-position="right" data-delay="50" data-tooltip="Remove Response">no_sim</i>
      <input required id="poll_response${responseCount} input_text" type="text" class="validate" name="poll[responses][]" maxlength="20">
      <label for="poll_response${responseCount}">Response</label>
     </div>`
    )
  $(".tooltipped").tooltip({delay: 50})
})

$("form .row").on("click", function(event) {
  if ($(event.target).hasClass('remove-icon')) {
    $('.material-tooltip').remove()
    event.target.parentElement.remove()
  }
});
