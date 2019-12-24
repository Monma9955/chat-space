$(function() {

  var search_result = $('#user-search-result')

  function appendUser(user) {
    var html =`
              <div class='chat-group-user clearfix'>
                <p class='chat-group-user__name'>${user.name}</p>
                <div class='user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
              `
    search_result.append(html);
    console.log(html);
  }

  function FormNoUser() {
    var html =`
              <div class="chat-group-user clearfix">
              <p class="chat-group-user__name">ユーザーが見つかりません</p>
              </div>`
    search_result.append(html);
    console.log(html);
  }

  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      search_result.empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        FormNoUser();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });
});