$(function() {

  var search_result = $('#user-search-result')

  function hitUser(user) {
    var html =`
              <div class='chat-group-user clearfix'>
                <p class='chat-group-user__name'>${user.name}</p>
                <a class='user-search-add chat-group-user__btn chat-group-user__btn--add' data-user-id='${user.id}' data-user-name='${user.name}'>追加</a>
              </div>
              `;
    search_result.append(html);
  }

  function hitNoUser() {
    var html =`
              <div class='chat-group-user clearfix'>
              <p class='chat-group-user__name'>ユーザーが見つかりません</p>
              </div>`;
    search_result.append(html);
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
          hitUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        hitNoUser();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });
});