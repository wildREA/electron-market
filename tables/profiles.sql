-- Profiles table
CREATE TABLE profiles (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    country_code VARCHAR(10),
    profile_image TEXT,
    biography TEXT,
    FOREIGN KEY (username) REFERENCES users(username)
);
