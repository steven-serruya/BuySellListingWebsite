const express = require('express');
const router  = express.Router();
const dbQueries = require('../db/queries/queries'); // Import your dbQueries module

router.get('/:id', (req, res) => {
  const itemId = parseInt(req.params.id); // Get the item id from the URL parameter
  const user = req.session.user || null;
  const email = req.session.user.email;

  dbQueries.getItemById(itemId) // Fetch item details by id from the database using your queries module

    .then(item => {
      if (!item) {
        return res.status(404).send('Item not found');
      }
      res.render('details.ejs', { item, user, email }); // Pass the item data to the EJS template
    })
    .catch(error => {
      console.error('Error fetching item details:', error);
      res.status(500).send('Internal Server Error');
    });
});


module.exports = router;
