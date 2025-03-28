-- Messages table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    channel_name VARCHAR(255) NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (channel_name) REFERENCES channels(name),
    FOREIGN KEY (sender_name) REFERENCES users(username)
);