// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const dbQueries = require('./db/queries/queries'); // Import your dbQueries module
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8060;
const app = express();
const login = require('./routes/login');
const logout = require('./routes/logout');
const itemSold = require('./routes/itemSold');
const itemInStock = require('./routes/itemInStock');

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieSession({
  name: "session",
  keys: ["fghujkahjksflkj"],
  maxAge: 24 * 60 * 60 * 1000
}));
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/login', login);
app.use('/logout', logout);
app.use('/itemSold', itemSold);
app.use('/itemInStock', itemInStock);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  //get the user from session
  const user = req.session.user || null;
  dbQueries.getItems(6) // Fetch items from the database using your queries module
    .then(items => {
      res.render('index.ejs', { items, user }); // Pass the items data to the EJS template

    })
    .catch(error => {
      console.error('Error fetching items:', error);
      res.status(500).send('Internal Server Error');
    });

});

app.get('/details/:id', (req, res) => {
  const itemId = parseInt(req.params.id); // Get the item id from the URL parameter


  dbQueries.getItemById(itemId) // Fetch item details by id from the database using your queries module

    .then(item => {
      if (!item) {
        return res.status(404).send('Item not found');
      }
      const user = req.session.user || null;
      res.render('details.ejs', { item, user}); // Pass the item data to the EJS template
    })
    .catch(error => {
      console.error('Error fetching item details:', error);
      res.status(500).send('Internal Server Error');
    });
});


app.get('/listings', (req, res) => {
  dbQueries.getItems(12) // Fetch the first 12 items from the database using your queries module
    .then(items => {
      const user = req.session.user || null; // Get the user from session

      res.render('listings', { items, user }); // Render the 'listings.ejs' template with data
    })
    .catch(error => {
      console.error('Error fetching items:', error);
      res.status(500).send('Internal Server Error');
    });
});

// Add a new route for loading all items
app.get('/listings/all', (req, res) => {
  dbQueries.getItems(30) // Fetch the first 12 items from the database using your queries module
    .then(items => {
      console.log('items++++', items);
      const user = req.session.user || null; // Get the user from session

      res.render('listingsAll', { items, user }); // Render the 'listingsAll.ejs' template with data
      res.render('listingsAll', { items, user }); // Render the 'listingsAll.ejs' template with data
    })
    .catch(error => {
      console.error('Error fetching items:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/sell', (req, res) => {
  // Assuming you have the appropriate logic for user authentication
  const user = req.session.user || null;

  if (!user) {
    // If user is not logged in, you might want to redirect them to the login page
    return res.redirect('/login'); // Replace '/login' with your actual login route
  }

  res.render('addItems.ejs', { user }); // Pass the user variable to the template
});

app.post('/sell', (req, res) => {
  // Assuming you have a database module or function to interact with the database

  const name = req.body.itemName;
  const price = req.body.price;
  const description = req.body.description;
  const picurl = req.body.picUrl;
  const seller_id = req.session.user.id; // Assuming you store user ID in session upon login
  const detailed_description = req.body.detailed_description;
  // Insert the item into the database
  dbQueries.createItem(name, price, picurl, seller_id, description, detailed_description) // Make sure to match the parameters with your query
    .then(() => {
      // Redirect to a success page or back to the sell page
      res.redirect('listings/all'); // Redirect back to the sell page after successful submission
    })
    .catch(error => {
      console.error('Error adding item:', error);
      res.status(500).send('Internal Server Error');
    });
});
app.get('/delete/:itemId', (req, res) => {
  const user = req.session.user || null;

  if (!user) {
    // Redirect to login page or show an error message
    return res.redirect('/login'); // Replace with your login route
  }

  const itemId = req.params.itemId;


  dbQueries.removeItemById(itemId)
    .then(() => {
      res.redirect('/listings/all'); // Redirect back to the listings page after successful removal
    })
    .catch(error => {
      console.error('Error removing item:', error);
      res.status(500).send('Internal Server Error');
    });
});


app.get('/logout', (req, res) => {
  // Clear the user's session data
  req.session = null;

  // Redirect to the homepage or login page
  res.redirect('/');
});
app.get('/edit/:itemId', (req, res) => {
  const user = req.session.user || null;
  if (!user) {
    return res.redirect('/login'); // Redirect to login if user is not logged in
  }
  const itemId = req.params.itemId;
  dbQueries.getItemById(itemId)
    .then((item) => {
      res.render(`editform`, { item, user }); // Redirect to the item details page after editing
    })
    .catch(error => {
      console.error('Error updating item:', error);
      res.status(500).send('Internal Server Error');
    });
});
app.post('/edit/:itemId', (req, res) => {
  const user = req.session.user || null;

  if (!user) {
    return res.redirect('/login'); // Redirect to login if user is not logged in
  }
  // console.log(req.body);
  const itemId = req.params.itemId;
  const name = req.body.itemName;
  const price = req.body.price;
  const description = req.body.description;
  const picUrl = req.body.picUrl;

  // Update the item's details in the database using your database functions
  dbQueries.updateItem(itemId, { name, price, description, picUrl })
    .then(() => {
      res.redirect(`/listings/all`); // Redirect to the item details page after editing
    })
    .catch(error => {
      console.error('Error updating item:', error);
      res.status(500).send('Internal Server Error');
    });
});

// In your server.js or routes file
app.get('/favorites', (req, res) => {
  // Assuming you have the appropriate logic for user authentication
  const user = req.session.user || null;

  if (!user) {
    // If user is not logged in, you might want to redirect them to the login page
    return res.redirect('/login'); // Replace '/login' with your actual login route
  }

  // Here, you need to fetch the user's favorite items from the database
  // and pass them to the EJS template
  // You can use your database queries module or functions for this
  // Example:
  dbQueries.getFavoriteItems(user.id)
    .then(favoriteItems => {
      res.render('favorites.ejs', { user, favoriteItems });
    })
    .catch(error => {
      console.error('Error fetching favorite items:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/add-favorite/:itemId', (req, res) => {
  const userId = req.session.user.id;
  const itemId = req.params.itemId;

  // Add the item to the user's favorites in the database
  dbQueries.addFavorite(userId, itemId)
    .then(() => {

      res.redirect('/listings/all'); // Redirect back to the favorites page after adding to favorites
    })
    .catch(error => {
      console.error('Error adding favorite item:', error);
      res.status(500).send('Internal Server Error');
    });
});

// Assuming you have a module for database queries named dbQueries
app.post('/remove-favorite/:itemId', (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.redirect('/login');
  }

  const itemId = req.params.itemId;
  const userId = user.id;
  console.log("itemid++++++", itemId);
  console.log("userId++++++++", userId);
  // Call a function to remove the favorite item from the database
  dbQueries.removeFavorite(userId, itemId)

    .then(() => {

      res.redirect('/favorites'); // Redirect back to the favorites page after removing
    })
    .catch(error => {
      console.error('Error removing favorite item:', error);
      res.status(500).send('Internal Server Error');
    });
});




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


