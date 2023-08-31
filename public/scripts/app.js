// Client facing scripts here

$(document).ready(function() {
  console.log('Ready');
  $('#item-sold').on('submit', function(event) {
    event.preventDefault();

    const $action = $('#item-sold').attr('action');
    const itemId = $action.slice(10);
    console.log('item id', itemId);

    $.ajax({
      type: 'POST',
      url: '/itemSold',
      data: { itemId },
      success: () => {

      }
    });
  });
});