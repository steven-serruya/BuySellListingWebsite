INSERT INTO users (username, email, firstname, lastname, password, admin)
VALUES
    ('john_doe', 'user1@example.com', 'John', 'Doe', '$2a$10$ypcYB8tsCLku1VIJeQvG.OcCyVmdIMGS7BUph/cRWCQAOfTO6JISe', true),
    ('jane_smith', 'user2@example.com', 'Jane', 'Smith', '$2a$10$ypcYB8tsCLku1VIJeQvG.OcCyVmdIMGS7BUph/cRWCQAOfTO6JISe', false),
    ('alice_johnson', 'user3@example.com', 'Alice', 'Johnson', '$2a$10$ypcYB8tsCLku1VIJeQvG.OcCyVmdIMGS7BUph/cRWCQAOfTO6JISe', false),
    ('bob_brown', 'user4@example.com', 'Bob', 'Brown', '$2a$10$ypcYB8tsCLku1VIJeQvG.OcCyVmdIMGS7BUph/cRWCQAOfTO6JISe', false),
    ('eve_white', 'user5@example.com', 'Eve', 'White', '$2a$10$ypcYB8tsCLku1VIJeQvG.OcCyVmdIMGS7BUph/cRWCQAOfTO6JISe', false);
