
const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require("bcryptjs");
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: "session",
  keys: ["fghujkahjksflkj"],
  maxAge: 24 * 60 * 60 * 1000
}));
const salt = bcrypt.genSaltSync(10);

router.get('/', (req, res) => {
  res.render('login.ejs');
});

router.post('/', (req, res) => {
  console.log("Params", req.body);
  const email = req.body.email;
  const values = [email];
  db.query(`
  SELECT id, password
  FROM users
  WHERE email = $1
  `, values)
    .then(res => {
      // console.log('inner password', !bcrypt.compareSync(req.body.password, res.rows[1]));
      // if (!bcrypt.compareSync(req.body.password, res.rows[1])) {
      //   console.log("Wrong password");
      // }

      // req.session.userId = res.rows[0];
      // res.redirect('/');
    });

  res.render('login.ejs');
});

module.exports = router;