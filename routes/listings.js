const express = require('express');
const router  = express.Router();
const dbQueries = require('../db/queries/queries'); // Import your dbQueries module

router.get('/', (req, res) => {
  console.log("Troubleshooting", req);
  dbQueries.getItems() // Fetch items from the database using your queries module
    .then(items => {
      res.render('listings', { items }); // Render the 'listings.ejs' template with data
    })
    .catch(error => {
      console.error('Error fetching items:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
