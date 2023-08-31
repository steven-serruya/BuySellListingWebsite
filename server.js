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

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  //get the user from session
  const user = req.session.user || null;
  dbQueries.getItems(6) // Fetch items from the database using your queries module
    .then(items => {
      console.log("user+++", user);
      res.render('index.ejs', { items, user }); // Pass the items data to the EJS template

    })
    .catch(error => {
      console.error('Error fetching items:', error);
      res.status(500).send('Internal Server Error');
    });

});

app.get('/details/:id', (req, res) => {
  const itemId = parseInt(req.params.id); // Get the item id from the URL parameter
  const user = req.session.user || null;

  dbQueries.getItemById(itemId) // Fetch item details by id from the database using your queries module

    .then(item => {
      if (!item) {
        return res.status(404).send('Item not found');
      }
      console.log("item++++:", item);
      res.render('details.ejs', { item, user }); // Pass the item data to the EJS template
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
      const user = req.session.user || null; // Get the user from session

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

  // Assuming you have a database function to remove an item by its ID
  // Replace 'removeItemById' with the actual function to remove the item
  dbQueries.removeItemById(itemId)
    .then(() => {
      res.redirect('/listings'); // Redirect back to the listings page after successful removal
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


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


