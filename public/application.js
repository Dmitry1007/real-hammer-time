var responseCount = 0
$('#response-btn').on('click', function() {
  responseCount++
  $('form .row').append(
    `<div class="input-field col s12">
      <i class="material-icons prefix tooltipped" data-position="right" data-delay="50" data-tooltip="Remove Response">no_sim</i>
      <input id="poll_response${responseCount}" type="tel" class="validate">
      <label for="poll_response${responseCount}">Response</label>
     </div>`
    )
  $('.tooltipped').tooltip({delay: 50})
})
