const db = require('../connection');



const createItem = (name, price, sellerId) => {
  return db.query('INSERT INTO items(name, price, seller_id) VALUES($1, $2, $3) RETURNING id;', [name, price, sellerId])
    .then(data => {
      return data.rows[0].id;
    })
    .catch(error => {
      throw error;
    });
};

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [Id])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

const getItems = (limit = 20) => {
  return db.query(`SELECT * FROM items LIMIT ${limit};`)
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

  createItem,
  getUserById,
  getItems,
  getItemById,
  removeItem
};
