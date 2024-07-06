-- Create user table
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS warehouse;
DROP TABLE IF EXISTS transporter;
DROP TABLE IF EXISTS path;
DROP TABLE IF EXISTS truck;
DROP TABLE IF EXISTS driver;
DROP TABLE IF EXISTS truck_owner;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50)
);

-- Create truck_owner table
CREATE TABLE truck_owner (
    truck_owner_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE driver (
     driver_id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT,
     FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create city table
CREATE TABLE city (
    city_id INT AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(255) NOT NULL
);

-- Create truck table
CREATE TABLE truck (
    truck_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id INT,
    city_id INT,
    status BOOLEAN,
    FOREIGN KEY (city_id) REFERENCES city(city_id),
    FOREIGN KEY (driver_id) REFERENCES driver(driver_id)
);

-- Create path table
CREATE TABLE path (
    path_id INT AUTO_INCREMENT PRIMARY KEY,
    source INT,
    destination INT,
    FOREIGN KEY (source) REFERENCES city(city_id),
    FOREIGN KEY (destination) REFERENCES city(city_id)
);

-- Create transporter table
CREATE TABLE transporter (
    transporter_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create warehouse table
CREATE TABLE warehouse (
    warehouse_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    city_id INT,
    capacity INT,
    availability BOOLEAN,
    price_per_day INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (city_id) REFERENCES city(city_id)
);

-- Create booking table
CREATE TABLE booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    transporter_id INT,
    truck_id INT,
    path_id INT,
    payload VARCHAR(255),
    FOREIGN KEY (transporter_id) REFERENCES transporter(transporter_id),
    FOREIGN KEY (truck_id) REFERENCES truck(truck_id),
    FOREIGN KEY (path_id) REFERENCES path(path_id)
);
