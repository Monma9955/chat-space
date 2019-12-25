$(function(){

  function buildHTML(message) {
    var htmlUpper =
    `<div class="message" data-message-id=${message.id} >
      <div class="message__upper-info">
        <div class="message__upper-info__talker">
          ${message.user_name}
        </div>
        <div class="message__upper-info__date">
          ${message.created_at}
        </div>
      </div>`
    if( message.message && message.image) {
      var html = 
      htmlUpper +
      `<div class='message__lower'>
        <p class='message__lower__text'>
          ${message.message}
        </p>
        <img class="message__lower__image" src=${message.image}>
      </div>
    </div>`
    } else if (message.message) {
      var html =
      htmlUpper +
      `<div class='message__lower'>
        <p class='message__lower__text'>
          ${message.message}
        </p>
      </div>
    </div>`
    } else if (message.image) {
      var html =
      htmlUpper +
      `<div class='message__lower'>
        <img class="message__lower__image" src=${message.image}>
      </div>
    </div>`
    };
    return html;
  };

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

});