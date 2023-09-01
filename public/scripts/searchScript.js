$(document).ready(function() {

  const renderItems = function(items, user) {
    $('.search-card').empty();

    for (let item of items) {
      const card = createCardElement(item, user);
      $('.search-card').append(card);
    }
  };

  const createCardElement = function(item, user) {

    let card = `
    <div class="col-sm-3 mb-3 mb-sm-5">
           <div class="card" style="width: 18rem;">
             <img src="${item.picurl}" class="card-img-top" alt="${item.name}">
             <div class="card-img-overlay" style="bottom: 230px; padding: 0px;">`;

    if (item.sold) {
      card += ` 
    <div style="position: relative; left: 0; top: 0;">
      <img src="images/sold_out_sticker.png" class="img-sold-card">
    </div>`;
    }
    card += `
          </div>
          <div class="card-body">
            <h5 class="card-title">
              ${item.name}
            </h5>
            <p class="card-text">
              ${item.description}
            </p>
            <p class="card-text"><strong>$${item.price}</strong></p> <!-- Price in bold -->
            <a href="/details/${item.id}" class="btn btn-primary">More details</a>
            <!-- Use dynamic link to details page --> `;

    if (user) {
      if (item.favorite_id) {
        card += `
        <form action="/remove-favorite/${item.id}" method="POST">
          <button type="submit">
            <div class="heart-icon red-heart" id="heart-icon-${item.id}">
              <i class="fa-solid fa-heart"></i>
            </div>
          </button>
        </form>
        `;
      }
      if (!item.favorite_id) {
        card += `
        <form action="/add-favorite/${item.id}" method="POST">
          <button type="submit">
            <div class="heart-icon" id="heart-icon-${item.id}">
              <i class="fa-solid fa-heart"></i>
            </div>
          </button>
        </form>
        `;
      }
    }
    card = $(card);

    return card;
  };

  $('#search').on('submit', function(event) {
    event.preventDefault();

    const $data = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: '/search',
      data: $data,
      success: (data) => {
        const items = data.items;
        const user = data.user;
        renderItems(items, user);
      }
    });
  });
});