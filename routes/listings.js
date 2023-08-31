const express = require('express');
const router  = express.Router();
const dbQueries = require('../db/queries/queries'); // Import your dbQueries module

router.get('/', (req, res) => {
  const user = req.session.user || null; // Get the user from session
  dbQueries.getItems(12) // Fetch items from the database using your queries module
    .then(items => {
      res.render('listings', { items, user }); // Render the 'listings.ejs' template with data
    })
    .catch(error => {
      console.error('Error fetching items:', error);
      res.status(500).send('Internal Server Error');
    });
});

// Add a new route for loading all items
router.get('/all', (req, res) => {
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

module.exports = router;
