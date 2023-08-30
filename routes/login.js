
const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require("bcryptjs");

//const salt = '$2a$10$ypcYB8tsCLku1VIJeQvG.O';

router.get('/', (req, res) => {
  const templateVars = {
    user: req.session
  };
  res.render('login.ejs', templateVars);
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const values = [email];
  db.query(`
  SELECT id, username, password
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
        req.session = {
          id: user.id.toString(),
          username: user.username
        };
        res.redirect('/');
      }
      res.render('login.ejs');
    })
    .catch(err => console.error('query error', err.stack));
});

module.exports = router;