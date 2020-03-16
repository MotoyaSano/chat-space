$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<li class="chat-lists">
      <div class="chat-list">
      <p class="chat-name">
      ${message.user_name}
      </p>
      <p class="chat-time">
      ${message.created_at}
      </p>
      </div>
      <p class="chat-message">
      ${message.content}
      </p>
      <img class="lower-message__image" src="${message.image}" alt="Test image">
      </li>`
        
      return html;
    
    } else {
      var html =
       `<li class="chat-lists">
          <div class="chat-list">
          <p class="chat-name">
            ${message.user_name}
          </p>
          <p class="chat-time">
            ${message.created_at}
          </p>
          </div>
          <p class="chat-message">
            ${message.content}
          </p>
        </li>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })

     .done(function(data){
       var html = buildHTML(data);
       $('.main-chat__message-list').append(html);
       $('form')[0].reset();
       $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight}, 'fast');
       $('.submit-btn').prop('disabled', false);
     })
     .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});