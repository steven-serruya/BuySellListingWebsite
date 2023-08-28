const db = require('../connection');

const createUser = (username, email) => {
  return db.query('INSERT INTO users(username, email) VALUES($1, $2) RETURNING id;', [username, email])
    .then(data => {
      return data.rows[0].id;
    })
    .catch(error => {
      throw error;
    });
};

const createItem = (name, price, sellerId) => {
  return db.query('INSERT INTO items(name, price, seller_id) VALUES($1, $2, $3) RETURNING id;', [name, price, sellerId])
    .then(data => {
      return data.rows[0].id;
    })
    .catch(error => {
      throw error;
    });
};

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

const getItems = () => {
  return db.query('SELECT * FROM items;')
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

const getItemById = (itemId) => {
  return db.query('SELECT * FROM items WHERE id = $1;', [itemId])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

const removeItem = (itemId) => {
  return db.query('DELETE FROM items WHERE id = $1;', [itemId])
    .catch(error => {
      throw error;
    });
};

module.exports = {
  createUser,
  createItem,
  getUsers,
  getItems,
  getItemById,
  removeItem
};
