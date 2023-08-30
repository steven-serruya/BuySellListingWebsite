const express = require('express');
const router  = express.Router();
const dbQueries = require('../db/queries/queries'); // Import your dbQueries module

router.post('/', (req, res) => {
  console.log("Troubleshooting", req);
  const name = req.body.name;
  const price = parseInt(req.body.price);
  const sellerId = parseInt(req.params.sellerId);
  // const itemId = parseInt(req.params.id);
  dbQueries.createItem(name, price, sellerId) // Fetch items from the database using your queries module
    .then((data) => {
      res.json(data); // To be cross checked with the ejs
    })
    .catch(error => {
      console.error('Error adding items:', error);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/', (req, res) => {
  res.render('add');
});

module.exports = router;
