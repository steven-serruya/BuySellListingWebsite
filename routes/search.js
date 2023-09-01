const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { getItems } = require('../db/queries/queries');

router.get('/', (req, res) => {
  getItems(12)
    .then(items => {
      const user = req.session.user || null;

      res.render('search.ejs', { items, user });
    });
});

router.post('/', (req, res) => {
  const search = '%' + req.body.search + '%';
  let sort;
  if (req.body.sort == 1) {
    sort = 'price';
  } else if (req.body.sort == 2) {
    sort = 'price DESC';
  } else if (req.body.sort == 3) {
    sort = 'date';
  } else {
    sort = 'date DESC';
  }

  const values = [search];

  db.query(`
  SELECT *
  FROM items
  WHERE UPPER(name) LIKE UPPER($1)
  ORDER BY ${sort};
`, values)
    .then(items => {
      const user = req.session.user || null;
      const data = {
        items: items.rows,
        user
      };
      res.status(201).send(data);
    })
    .catch(err => console.error('query error', err.stack));
});

module.exports = router;