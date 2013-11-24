/*global $, document*/

(function () {
  "use strict"

  $(document).foundation();

  $(document).ready(function () {
    var socket = io.connect('http://localhost');

    socket.on('receive-chat', function (data) {
      var message_obj = data['message'];
      $('.chat-box').val([$('.chat-box').val(),'\n',[message_obj['user'],':',message_obj['message']].join(' ')].join(''));
    });

    socket.on('connected-users', function (data) {
      $('.user-connect-wrapper').addClass('hide');
      $('.chat-input-wrapper').removeClass('hide');
      $('.user-list').val(_.reduce(data['users'], function (x, y) { return [x, y].join('\n'); }));
    });


    $('.user-connect').on("click", function() {
      socket.emit('user-connect', { user: $('.user-name').val() });
    });

    $('.chat-input').on("focus", function () {
      // Set focus state
    });

    $('.chat-input').on("change", function () {
      // Set typing state
    });

    $('.chat-input-send').on("click", function () {
      socket.emit('send-chat', { user: $('.user-name').val(), message: $('.chat-input').val()});
      $('.chat-input').val('');
    });

    $(window).unload(function () {
      socket.emit('user-disconnect', { user: $('.user-name').val() });
    });
  });
})();
