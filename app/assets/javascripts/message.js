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

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('message-id');
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if(messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $('#new_message')[0].reset();
        $('.form__submit').prop('disabled', false);
      }
    })
    .fail(function() {
      alert("自動更新に失敗しました");
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});