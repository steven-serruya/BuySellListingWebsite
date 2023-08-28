-- Insert 4 messages
INSERT INTO messages (sender_id, receiver_id, item_id, content)
VALUES
    (1, 2, 1, 'Hello, I''m interested in Item 1.'),
    (2, 1, 1, 'Sure, let''s talk more about it.'),
    (3, 4, 2, 'Hi, is Item 2 still available?'),
    (4, 3, 2, 'Yes, Item 2 is still available.');
