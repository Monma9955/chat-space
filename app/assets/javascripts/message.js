$(function(){
  function buildHTML(message) {
    if( message.image ) {
      var html = 
      `<div class='message'>
        <div class='message__upper-info'>
          <div class='message__upper-info__talker'>
            ${message.user_name}
          </div>
          <div class='message__upper-info__date'>
            ${message.created_at}
          </div>
        </div>
        <div class='message__lower'>
          <p class='message__lower__text'>
            ${message.message}
          </p>
          <img class="message__lower__image" src=${message.image}>
        </div>
      </div>`
      return html;
    } else {
      var html =
       `<div class='message'>
          <div class='message__upper-info'>
            <div class='message__upper-info__talker'>
              ${message.user_name}
            </div>
            <div class='message__upper-info__date'>
              ${message.created_at}
            </div>
          </div>
          <div class='message__lower'>
            <p class='message__lower__text'>
              ${message.message}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.form__NewMessage__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })
})