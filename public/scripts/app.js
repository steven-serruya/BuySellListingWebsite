// Client facing scripts here

$(document).ready(function() {
  console.log('Ready');
  $('#item-sold').on('submit', function(event) {
    event.preventDefault();

    const $action = $('#item-sold').attr('action');
    const itemId = $action.slice(10);

    $.ajax({
      type: 'POST',
      url: '/itemSold',
      data: { itemId },
      success: function() {
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    });
  });

  $('#item-available').on('submit', function(event) {
    event.preventDefault();

    const $action = $('#item-available').attr('action');
    const itemId = $action.slice(13);

    $.ajax({
      type: 'POST',
      url: '/itemInStock',
      data: { itemId },
      success: function() {
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    });
  });
});