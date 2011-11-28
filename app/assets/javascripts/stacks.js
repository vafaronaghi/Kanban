$(function() {
  var update_inactive_users_text = function(){
    var users = $('#inactive-users .user').length;
    var text  = '';

    switch(users) {
    case 0:
      text = 'Nobody is slacking off';
      break;
    case 1:
      text = 'is slacking off';
      break;
    default:
      text = 'are slacking off';
    }

    $('#inactive-users h3').html(text);
  };

  $('.state').sortable({
    connectWith:['.state'],
    cursor: 'move',
    items: 'li',
    over: function(){
      $(this).addClass('droppable');
    },
    out: function(){
      $(this).removeClass('droppable');
    },
    update: function(){
      var data = {};
      data['state']   = $(this).attr('id');
      data['stories'] = $(this).sortable('toArray');

      $.ajax({
        type: 'post',
        data: data,
        dataType: 'script',
        url: '/stories/sort'
      })
    }
  });

  $('.users').sortable({
    connectWith:['.users'],
    cursor: 'move',
    items: 'img',
    over: function(){
      $(this).addClass('droppable');
    },
    out: function(){
      $(this).removeClass('droppable');
    },
    stop: function(){
      update_inactive_users_text();
    },
    update: function(){
      var data = {};
      data['story'] = $(this).attr('id');
      data['users'] = $(this).sortable('toArray');

      $.ajax({
        type: 'post',
        data: data,
        dataType: 'script',
        url: '/users/sort'
      })
    }
  });
});