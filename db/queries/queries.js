const db = require('../connection');



const createItem = (name, price, picurl, seller_id, description, detailed_description) => {
  return db.query('INSERT INTO items(name, price, picurl, seller_id, description, detailed_description) VALUES($1, $2, $3, $4, $5, $6) RETURNING id;', [name, price, picurl, seller_id, description, detailed_description])
    .then(data => {
      return data.rows[0].id;
    })
    .catch(error => {
      throw error;
    });
};

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [id])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};
const getItems = (limit) => {
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
const updateItem = (itemId, updates) => {
  const updateColumns = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
  const values = [itemId, ...Object.values(updates)];
  const query = `UPDATE items SET ${updateColumns} WHERE id = $1;`;
  console.log("updates+++", updates);
  console.log("query+++", query);
  console.log("values+++", values);
  return db.query(query, values)
    .then(() => {
      return "Item updated successfully";
    })
    .catch(error => {
      throw error;
    });
};

const removeItemById = (itemId) => {
  return db.query('DELETE FROM items WHERE id = $1;', [itemId])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

// Get favorite item
function getFavorite(userId, itemId) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM favorite_items WHERE user_id = $1 AND item_id = $2', [userId, itemId], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows[0]);
      }
    });
  });
}

// Add item to favorites
function addFavorite(userId, itemId) {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO favorite_items (user_id, item_id) VALUES ($1, $2)', [userId, itemId], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// Remove item from favorites
function removeFavorite(userId, itemId) {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM favorite_items WHERE user_id = $1 AND item_id = $2', [userId, itemId], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  createItem,
  getUserById,
  getItems,
  getItemById,
  removeItemById,
  getFavorite,
  addFavorite,
  removeFavorite,
  updateItem
};
