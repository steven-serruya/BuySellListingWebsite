-- Drop tables if they exist
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100)
);

-- Create items table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    seller_id INTEGER REFERENCES users(id)
);

-- Create messages table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    item_id INTEGER REFERENCES items(id),
    content TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
