$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html = 
      `<div class="message" data-message-id=${message.id}>
        <li class="chat-lists">
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
        </li>
      </div>`
        return html;
    } else {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <li class="chat-lists">
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
       $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight}, 'fast');
       $('form')[0].reset();
       $('.submit-btn').prop('disabled', false);
     })
     .fail(function() {
        alert("メッセージ送信に失敗しました");
     });
     return false;
  });
  
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
       $('.main-chat__message-list').append(insertHTML);
       $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
    }
    })
    .fail(function() {
      alert('error');
    });
    
    }
  
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
})

