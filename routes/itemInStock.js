const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/', (req, res) => {
  const id = req.body.itemId;
  const values = [id];
  db.query(`
  UPDATE items
  SET sold = FALSE
  WHERE id = $1;
  `, values)
    .then(() => {
      res.status(201).send();
    })
    .catch(err => console.error('query error', err.stack));
});

module.exports = router;