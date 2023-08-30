const express = require('express');
const router = express.Router();
const dbQueries = require('../db/queries/queries'); // Adjust the path accordingly

// Example route to add an item to favorites
router.post('/add-favorite', (req, res) => {
  const userId = req.user.id; // Assuming you have user data stored in req.user
  const itemId = req.body.itemId; // Assuming you have the item ID in the request body

  dbQueries.addFavorite(userId, itemId)
    .then(() => {
      res.status(200).json({ message: 'Item added to favorites' });
    })
    .catch(error => {
      console.error('Error adding item to favorites:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Example route to remove an item from favorites
router.post('/remove-favorite', (req, res) => {
  const userId = req.user.id; // Assuming you have user data stored in req.user
  const itemId = req.body.itemId; // Assuming you have the item ID in the request body

  dbQueries.removeFavorite(userId, itemId)
    .then(() => {
      res.status(200).json({ message: 'Item removed from favorites' });
    })
    .catch(error => {
      console.error('Error removing item from favorites:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;
