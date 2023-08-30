const express = require('express');
const router = express.Router();
const dbQueries = require('../db/queries/queries');

router.post('/', (req, res) => {
  const itemId = parseInt(req.params.id); // Get the item id from the URL parameter
  dbQueries.removeItem(itemId)
    .then((data) => {
      res.json(data);
    })
    .catch(error => {
      console.error('Error deleting items:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
