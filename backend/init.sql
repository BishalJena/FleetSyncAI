-- Drop Tables If They Exist (optional, only if you want to drop existing tables)
# DROP TABLE IF EXISTS booking;
# DROP TABLE IF EXISTS warehouse;
# DROP TABLE IF EXISTS transporter;
# DROP TABLE IF EXISTS path;
# DROP TABLE IF EXISTS truck;
# DROP TABLE IF EXISTS driver;
# DROP TABLE IF EXISTS truck_owner;
# DROP TABLE IF EXISTS city;
# DROP TABLE IF EXISTS users;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50)
);

-- Create Truck Owner Table
CREATE TABLE IF NOT EXISTS truck_owner (
    truck_owner_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT
    -- No foreign key constraint here yet
);

-- Create Driver Table
CREATE TABLE IF NOT EXISTS driver (
    driver_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT
    -- No foreign key constraint here yet
);

-- Create City Table
CREATE TABLE IF NOT EXISTS city (
    city_id INT AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(255) NOT NULL
);

-- Create Truck Table
CREATE TABLE IF NOT EXISTS truck (
    truck_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id INT,
    city_id INT,
    status BOOLEAN
    -- No foreign key constraint here yet
);

-- Create Path Table
CREATE TABLE IF NOT EXISTS path (
    path_id INT AUTO_INCREMENT PRIMARY KEY,
    source INT,
    destination INT
    -- No foreign key constraint here yet
);

-- Create Transporter Table
CREATE TABLE IF NOT EXISTS transporter (
    transporter_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT
    -- No foreign key constraint here yet
);

-- Create Warehouse Table
CREATE TABLE IF NOT EXISTS warehouse (
    warehouse_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    city_id INT,
    capacity INT,
    availability BOOLEAN,
    price_per_day INT
    -- No foreign key constraint here yet
);

-- Create Booking Table
CREATE TABLE IF NOT EXISTS booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    transporter_id INT,
    booking_date DATE,
    delivery_date DATE,
    isCompleted BOOLEAN,
    truck_id INT,
    path_id INT,
    payload VARCHAR(255)
    -- No foreign key constraint here yet
);

-- Add Foreign Key Constraints
ALTER TABLE truck_owner
ADD CONSTRAINT fk_truck_owner_users
FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE driver
ADD CONSTRAINT fk_driver_users
FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE truck
ADD CONSTRAINT fk_truck_driver
FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
ADD CONSTRAINT fk_truck_city
FOREIGN KEY (city_id) REFERENCES city(city_id);

ALTER TABLE path
ADD CONSTRAINT fk_path_source_city
FOREIGN KEY (source) REFERENCES city(city_id),
ADD CONSTRAINT fk_path_destination_city
FOREIGN KEY (destination) REFERENCES city(city_id);

ALTER TABLE transporter
ADD CONSTRAINT fk_transporter_users
FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE warehouse
ADD CONSTRAINT fk_warehouse_users
FOREIGN KEY (user_id) REFERENCES users(user_id),
ADD CONSTRAINT fk_warehouse_city
FOREIGN KEY (city_id) REFERENCES city(city_id);

ALTER TABLE booking
ADD CONSTRAINT fk_booking_transporter
FOREIGN KEY (transporter_id) REFERENCES transporter(transporter_id),
ADD CONSTRAINT fk_booking_truck
FOREIGN KEY (truck_id) REFERENCES truck(truck_id),
ADD CONSTRAINT fk_booking_path
FOREIGN KEY (path_id) REFERENCES path(path_id);

-- Populate city table
-- Users Table (50 rows)
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'rootpassword' WITH GRANT OPTION;

INSERT INTO users (email, password, type) VALUES 
('rajesh.kumar@gmail.com', 'hashed_password_1', 'driver'),
('priya.sharma@yahoo.com', 'hashed_password_2', 'driver'),
('amit.patel@hotmail.com', 'hashed_password_3', 'transporter'),
('neha.gupta@gmail.com', 'hashed_password_4', 'warehouse_manager'),
('vikram.singh@outlook.com', 'hashed_password_5', 'truck_owner'),
('anita.desai@gmail.com', 'hashed_password_6', 'driver'),
('suresh.mehta@yahoo.com', 'hashed_password_7', 'transporter'),
('pooja.reddy@gmail.com', 'hashed_password_8', 'driver'),
('rahul.verma@hotmail.com', 'hashed_password_9', 'transporter'),
('sunita.jain@gmail.com', 'hashed_password_10', 'driver'),
('arun.chopra@gmail.com', 'hashed_password_11', 'transporter'),
('kavita.rao@yahoo.com', 'hashed_password_12', 'driver'),
('deepak.malhotra@outlook.com', 'hashed_password_13', 'warehouse_manager'),
('anjali.nair@gmail.com', 'hashed_password_14', 'driver'),
('sanjay.bhatt@hotmail.com', 'hashed_password_15', 'transporter'),
('meera.saxena@yahoo.com', 'hashed_password_16', 'driver'),
('vivek.kapoor@gmail.com', 'hashed_password_17', 'truck_owner'),
('rashmi.das@outlook.com', 'hashed_password_18', 'driver'),
('nitin.agarwal@hotmail.com', 'hashed_password_19', 'transporter'),
('sheela.menon@gmail.com', 'hashed_password_20', 'driver'),
('rajiv.chadha@yahoo.com', 'hashed_password_21', 'transporter'),
('usha.bhatia@gmail.com', 'hashed_password_22', 'driver'),
('manoj.sinha@outlook.com', 'hashed_password_23', 'warehouse_manager'),
('geeta.mathur@hotmail.com', 'hashed_password_24', 'driver'),
('alok.trivedi@gmail.com', 'hashed_password_25', 'transporter'),
('swati.hegde@yahoo.com', 'hashed_password_26', 'driver'),
('praveen.khanna@outlook.com', 'hashed_password_27', 'truck_owner'),
('ritu.bajaj@gmail.com', 'hashed_password_28', 'driver'),
('ajay.thakur@hotmail.com', 'hashed_password_29', 'transporter'),
('nandini.shah@yahoo.com', 'hashed_password_30', 'driver'),
('vijay.mishra@gmail.com', 'hashed_password_31', 'transporter'),
('kiran.yadav@outlook.com', 'hashed_password_32', 'driver'),
('rohit.sengupta@yahoo.com', 'hashed_password_33', 'warehouse_manager'),
('priyanka.iyer@hotmail.com', 'hashed_password_34', 'driver'),
('gaurav.malhotra@gmail.com', 'hashed_password_35', 'transporter'),
('divya.prakash@yahoo.com', 'hashed_password_36', 'driver'),
('arjun.nair@outlook.com', 'hashed_password_37', 'transporter'),
('sneha.reddy@gmail.com', 'hashed_password_38', 'driver'),
('kunal.shah@hotmail.com', 'hashed_password_39', 'transporter'),
('lakshmi.menon@yahoo.com', 'hashed_password_40', 'driver'),
('aditya.joshi@gmail.com', 'hashed_password_41', 'transporter'),
('rani.mukherjee@outlook.com', 'hashed_password_42', 'driver'),
('vikash.singh@hotmail.com', 'hashed_password_43', 'warehouse_manager'),
('shalini.gupta@yahoo.com', 'hashed_password_44', 'driver'),
('rajesh.tiwari@gmail.com', 'hashed_password_45', 'transporter'),
('manisha.patel@outlook.com', 'hashed_password_46', 'driver'),
('amit.sharma@hotmail.com', 'hashed_password_47', 'transporter'),
('preeti.verma@yahoo.com', 'hashed_password_48', 'driver'),
('sandeep.kumar@gmail.com', 'hashed_password_49', 'transporter'),
('neeta.saxena@outlook.com', 'hashed_password_50', 'driver');

-- Truck Owner Table (3 rows, 5% of 50 users)
INSERT INTO truck_owner (user_id) VALUES
(5), (17), (27);

-- Driver Table (23 rows, 45% of 50 users)
INSERT INTO driver (user_id) VALUES
(1), (2), (6), (8), (10), (12), (14), (16), (18), (20), (22), (24), (26), (28), (30), (32), (34), (36), (38), (40), (42), (44), (46), (48), (50);

-- City Table (50 rows)
INSERT INTO city (city_name) VALUES
('Mumbai'), ('Delhi'), ('Bangalore'), ('Hyderabad'), ('Chennai'),
('Kolkata'), ('Ahmedabad'), ('Pune'), ('Jaipur'), ('Lucknow'),
('Kanpur'), ('Nagpur'), ('Indore'), ('Thane'), ('Bhopal'),
('Visakhapatnam'), ('Pimpri-Chinchwad'), ('Patna'), ('Vadodara'), ('Ghaziabad'),
('Ludhiana'), ('Agra'), ('Nashik'), ('Faridabad'), ('Meerut'),
('Rajkot'), ('Kalyan-Dombivli'), ('Vasai-Virar'), ('Varanasi'), ('Srinagar'),
('Aurangabad'), ('Dhanbad'), ('Amritsar'), ('Navi Mumbai'), ('Allahabad'),
('Ranchi'), ('Howrah'), ('Coimbatore'), ('Jabalpur'), ('Gwalior'),
('Vijayawada'), ('Jodhpur'), ('Madurai'), ('Raipur'), ('Kota'),
('Guwahati'), ('Chandigarh'), ('Solapur'), ('Hubballi-Dharwad'), ('Tiruchirappalli');

-- Truck Table (50 rows)
INSERT INTO truck (driver_id, city_id, status) VALUES
(1, 1, true), (2, 2, false), (3, 3, true), (4, 4, true), (5, 5, false),
(6, 6, true), (7, 7, false), (8, 8, true), (9, 9, true), (10, 10, false),
(11, 11, true), (12, 12, false), (13, 13, true), (14, 14, true), (15, 15, false),
(16, 16, true), (17, 17, false), (18, 18, true), (19, 19, true), (20, 20, false),
(21, 21, true), (22, 22, false), (23, 23, true), (24, 24, true), (25, 25, false),
(1, 26, true), (2, 27, false), (3, 28, true), (4, 29, true), (5, 30, false),
(6, 31, true), (7, 32, false), (8, 33, true), (9, 34, true), (10, 35, false),
(11, 36, true), (12, 37, false), (13, 38, true), (14, 39, true), (15, 40, false),
(16, 41, true), (17, 42, false), (18, 43, true), (19, 44, true), (20, 45, false),
(21, 46, true), (22, 47, false), (23, 48, true), (24, 49, true), (25, 50, false);

-- Path Table (50 rows)
INSERT INTO path (source, destination) VALUES
(1, 2), (2, 3), (3, 4), (4, 5), (5, 6),
(6, 7), (7, 8), (8, 9), (9, 10), (10, 11),
(11, 12), (12, 13), (13, 14), (14, 15), (15, 16),
(16, 17), (17, 18), (18, 19), (19, 20), (20, 21),
(21, 22), (22, 23), (23, 24), (24, 25), (25, 26),
(26, 27), (27, 28), (28, 29), (29, 30), (30, 31),
(31, 32), (32, 33), (33, 34), (34, 35), (35, 36),
(36, 37), (37, 38), (38, 39), (39, 40), (40, 41),
(41, 42), (42, 43), (43, 44), (44, 45), (45, 46),
(46, 47), (47, 48), (48, 49), (49, 50), (50, 1);

-- Transporter Table (20 rows, 40% of 50 users)
INSERT INTO transporter (user_id) VALUES
(3), (7), (9), (11), (15), (19), (21), (25), (29), (31),
(35), (37), (39), (41), (45), (47), (49);

-- Warehouse Table (5 rows, 10% of 50 users)
-- Warehouse Table (50 rows)
INSERT INTO warehouse (user_id, city_id, capacity, availability, price_per_day) VALUES
(4, 1, 10000, true, 5000),
(4, 2, 15000, true, 7500),
(4, 3, 12000, false, 6000),
(4, 4, 20000, true, 10000),
(4, 5, 18000, true, 9000),
(13, 6, 8000, true, 4000),
(13, 7, 13000, false, 6500),
(13, 8, 11000, true, 5500),
(13, 9, 17000, true, 8500),
(13, 10, 14000, false, 7000),
(23, 11, 9000, true, 4500),
(23, 12, 16000, true, 8000),
(23, 13, 12500, false, 6250),
(23, 14, 19000, true, 9500),
(23, 15, 15000, true, 7500),
(33, 16, 11000, false, 5500),
(33, 17, 18000, true, 9000),
(33, 18, 13000, true, 6500),
(33, 19, 21000, false, 10500),
(33, 20, 16000, true, 8000),
(43, 21, 10500, true, 5250),
(43, 22, 17000, false, 8500),
(43, 23, 12000, true, 6000),
(43, 24, 19500, true, 9750),
(43, 25, 14500, false, 7250),
(4, 26, 9500, true, 4750),
(4, 27, 15500, true, 7750),
(4, 28, 11500, false, 5750),
(4, 29, 20500, true, 10250),
(4, 30, 17500, true, 8750),
(13, 31, 8500, false, 4250),
(13, 32, 14000, true, 7000),
(13, 33, 10000, true, 5000),
(13, 34, 18500, false, 9250),
(13, 35, 13500, true, 6750),
(23, 36, 9500, true, 4750),
(23, 37, 16500, false, 8250),
(23, 38, 12000, true, 6000),
(23, 39, 19000, true, 9500),
(23, 40, 15000, false, 7500),
(33, 41, 11000, true, 5500),
(33, 42, 18000, true, 9000),
(33, 43, 13500, false, 6750),
(33, 44, 21500, true, 10750),
(33, 45, 16500, true, 8250),
(43, 46, 10000, false, 5000),
(43, 47, 17500, true, 8750),
(43, 48, 12500, true, 6250),
(43, 49, 20000, false, 10000),
(43, 50, 15500, true, 7750);
-- Booking Table (50 rows)
INSERT INTO booking (transporter_id, booking_date, delivery_date, isCompleted, truck_id, path_id, payload) VALUES
(1, '2023-01-01', '2023-01-05', true, 1, 1, 'Electronics'),
(2, '2023-01-02', '2023-01-06', false, 2, 2, 'Furniture'),
(3, '2023-01-03', '2023-01-07', true, 3, 3, 'Groceries'),
(4, '2023-01-04', '2023-01-08', false, 4, 4, 'Clothing'),
(5, '2023-01-05', '2023-01-09', true, 5, 5, 'Machinery'),
(6, '2023-01-06', '2023-01-10', false, 6, 6, 'Books'),
(7, '2023-01-07', '2023-01-11', true, 7, 7, 'Automobiles'),
(8, '2023-01-08', '2023-01-12', false, 8, 8, 'Pharmaceuticals'),
(9, '2023-01-09', '2023-01-13', true, 9, 9, 'Construction Materials'),
(10, '2023-01-10', '2023-01-14', false, 10, 10, 'Food Products'),
(11, '2023-01-11', '2023-01-15', true, 11, 11, 'Chemicals'),
(12, '2023-01-12', '2023-01-16', false, 12, 12, 'Textiles'),
(13, '2023-01-13', '2023-01-17', true, 13, 13, 'Paper Products'),
(14, '2023-01-14', '2023-01-18', false, 14, 14, 'Cosmetics'),
(15, '2023-01-15', '2023-01-19', true, 15, 15, 'Agricultural Products'),
(16, '2023-01-16', '2023-01-20', false, 16, 16, 'Toys'),
(17, '2023-01-17', '2023-01-21', true, 17, 17, 'Sports Equipment'),
(1, '2023-01-18', '2023-01-22', false, 18, 18, 'Home Appliances'),
(2, '2023-01-19', '2023-01-23', true, 19, 19, 'Industrial Equipment'),
(3, '2023-01-20', '2023-01-24', false, 20, 20, 'Medical Supplies'),
(4, '2023-01-21', '2023-01-25', true, 21, 21, 'Office Supplies'),
(5, '2023-01-22', '2023-01-26', false, 22, 22, 'Pet Supplies'),
(6, '2023-01-23', '2023-01-27', true, 23, 23, 'Jewelry'),
(7, '2023-01-24', '2023-01-28', false, 24, 24, 'Automotive Parts'),
(8, '2023-01-25', '2023-01-29', true, 25, 25, 'Beverages'),
(9, '2023-01-26', '2023-01-30', false, 26, 26, 'Frozen Foods'),
(10, '2023-01-27', '2023-01-31', true, 27, 27, 'Electrical Components'),
(11, '2023-01-28', '2023-02-01', false, 28, 28, 'Plastic Products'),
(12, '2023-01-29', '2023-02-02', true, 29, 29, 'Glass Products'),
(13, '2023-01-30', '2023-02-03', false, 30, 30, 'Rubber Products'),
(14, '2023-01-31', '2023-02-04', true, 31, 31, 'Leather Goods'),
(15, '2023-02-01', '2023-02-05', false, 32, 32, 'Musical Instruments'),
(16, '2023-02-02', '2023-02-06', true, 33, 33, 'Art Supplies'),
(17, '2023-02-03', '2023-02-07', false, 34, 34, 'Cleaning Supplies'),
(1, '2023-02-04', '2023-02-08', true, 35, 35, 'Garden Supplies'),
(2, '2023-02-05', '2023-02-09', false, 36, 36, 'Stationery'),
(3, '2023-02-06', '2023-02-10', true, 37, 37, 'Kitchenware'),
(4, '2023-02-07', '2023-02-11', false, 38, 38, 'Sporting Goods'),
(5, '2023-02-08', '2023-02-12', true, 39, 39, 'Camping Equipment'),
(6, '2023-02-09', '2023-02-13', false, 40, 40, 'Baby Products'),
(7, '2023-02-10', '2023-02-14', true, 41, 41, 'Party Supplies'),
(8, '2023-02-11', '2023-02-15', false, 42, 42, 'Craft Supplies'),
(9, '2023-02-12', '2023-02-16', true, 43, 43, 'Hardware'),
(10, '2023-02-13', '2023-02-17', false, 44, 44, 'Automotive Fluids'),
(11, '2023-02-14', '2023-02-18', true, 45, 45, 'Gardening Tools'),
(12, '2023-02-15', '2023-02-19', false, 46, 46, 'Pet Food'),
(13, '2023-02-16', '2023-02-20', true, 47, 47, 'Bedding'),
(14, '2023-02-17', '2023-02-21', false, 48, 48, 'Luggage'),
(15, '2023-02-18', '2023-02-22', true, 49, 49, 'Seasonal Decorations'),
(16, '2023-02-19', '2023-02-23', false, 50, 50, 'Pool Supplies');