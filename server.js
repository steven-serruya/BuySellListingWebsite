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

  dbQueries.getItemById(itemId) // Fetch item details by id from the database using your queries module

    .then(item => {
      if (!item) {
        return res.status(404).send('Item not found');
      }
      console.log("item++++:", item);
      res.render('details.ejs', { item }); // Pass the item data to the EJS template
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
  dbQueries.getItems(20) // Fetch the first 12 items from the database using your queries module
    .then(items => {
      const user = req.session.user || null; // Get the user from session

      res.render('listingsAll', { items }); // Render the 'listingsAll.ejs' template with data
    })
    .catch(error => {
      console.error('Error fetching items:', error);
      res.status(500).send('Internal Server Error');
    });
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


