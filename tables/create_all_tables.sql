-- Create all tables

-- Users table
CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Profiles table
CREATE TABLE profiles (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    country_code VARCHAR(10),
    profile_image TEXT,
    description TEXT,
    FOREIGN KEY (username) REFERENCES users(username)
);

-- Channels table
CREATE TABLE channels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    user1 VARCHAR(255) NOT NULL,
    user2 VARCHAR(255) NOT NULL,
    FOREIGN KEY (user1) REFERENCES users(username),
    FOREIGN KEY (user2) REFERENCES users(username)
);

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

-- Cars table
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    color VARCHAR(255),
    fuel VARCHAR(255),
    engine VARCHAR(255),
    horsepower INTEGER,
    torque INTEGER,
    transmission VARCHAR(255),
    drivetrain VARCHAR(255),
    redline INTEGER,
    acceleration DECIMAL(10, 2),
    top_speed INTEGER,
    platform VARCHAR(255),
    suspension VARCHAR(255),
    brakes_front VARCHAR(255),
    brakes_rear VARCHAR(255),
    production_notes TEXT,
    additional_info TEXT,
    image VARCHAR(255)
);