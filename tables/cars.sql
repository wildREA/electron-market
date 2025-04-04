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
    weight VARCHAR(20),
    platform VARCHAR(255),
    suspension VARCHAR(255),
    brakes_front VARCHAR(255),
    brakes_rear VARCHAR(255),
    production_notes TEXT,
    additional_info TEXT,
    image VARCHAR(255)
);
