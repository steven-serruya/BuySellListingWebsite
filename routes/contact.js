const express = require('express');
const router = express.Router();
const dbQueries = require('../db/queries/queries');

router.post('/:id', (req, res) => {
  console.log(req.params.id);
  dbQueries.getEmailById(req.params.id)
    .then((email) => {
      const templateVars = email;
      res.render('email', templateVars);
    })
    .catch(error => {
      console.error('Error fetching the user email address:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
