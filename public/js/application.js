$(document).ready(function() {
  $(document).on('submit', 'form[class="new"]', function(e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/note',
      data: $(this).serialize()
    }).done(function(data){
      $('ul').append('<li><p>' + data.note.note + '</p><form name=' + data.note.id + ' class="update" action="/note/' + data.note.id + '" method="put"><input name="text"><input type="submit" value="update"></form><a class="delete" href="/note/' + data.note.id + '">delete</a></li>');
      $('textarea').val("");
    });
  });

  $(document).on('submit','.update', function(e){
    e.preventDefault();
    var link = $(this).attr("action");
    var current = this;
    if ($(current).find('input[name="text"]').val() !== "") {
      $.ajax({
        type: 'put',
        url: link,
        data: $(this).serialize()
      }).done(function(data){
        $(current).parent().find('p').text(data.note.note);
        $(current).find('input[name="text"]').val("");
      });
    }
  });

  $(document).on('click', '.delete', function(e){
    e.preventDefault();
    var link = $(this).attr("href");
    var current = this;
    $.ajax({
      type: 'delete',
      url: link
    }).done(function(data){
      $(current).parent().remove();
    });
  });
});
