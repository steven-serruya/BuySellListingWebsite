// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const dbQueries = require('./db/queries/queries'); // Import your dbQueries module

const PORT = process.env.PORT || 8060;
const app = express();

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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');

const login = require('./routes/login');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);

app.use('/login', login);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  dbQueries.getItems(6) // Fetch items from the database using your queries module
    .then(items => {
      res.render('index.ejs', { items }); // Pass the items data to the EJS template
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
  dbQueries.getItems() // Fetch items from the database using your queries module
    .then(items => {
      res.render('listings', { items }); // Render the 'listings.ejs' template with data
    })
    .catch(error => {
      console.error('Error fetching items:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


