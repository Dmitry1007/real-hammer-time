$('#response-btn').on('click', function() {
  $('form .row').append(`<div class="input-field col s12">
                          <i class="material-icons prefix">no_sim</i>
                          <input id="icon_remove_response" type="tel" class="validate">
                          <label for="icon_remove_response">Response</label>
                         </div>`)
})
