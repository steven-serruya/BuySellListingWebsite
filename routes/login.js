
const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require("bcryptjs");

//const salt = '$2a$10$ypcYB8tsCLku1VIJeQvG.O';

router.get('/', (req, res,) => {
  res.render('login.ejs', { user: null });
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const values = [email];
  db.query(`
  SELECT id, password, email, username
  FROM users
  WHERE email = $1;
  `, values)
    .then(res => {
      if (!res.rows[0]) {
        console.log("Wrong email");
        return;
      }

      const user = res.rows[0];

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        console.log("wrong password");
        return;
      }
      return user;
    })
    .then((user) => {
      if (user) {
        req.session.user = user;
        res.redirect('/');
      }
      res.render('login.ejs');
    })
    .catch(err => console.error('query error', err.stack));
});

module.exports = router;