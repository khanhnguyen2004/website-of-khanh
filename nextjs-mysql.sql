CREATE DATABASE nextjs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nextjs;
CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'client'
);
INSERT INTO users (username, password, role) VALUES
('user1', '@user123', 'client'),
('user2', '@user456', 'client'),
('user3', '@user789', 'client'),
('admin', '@admin123', 'admin');
CREATE TABLE infoAdmin (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phoneNumber VARCHAR(10) NOT NULL UNIQUE,
    idUser INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES users(id)
);
INSERT INTO infoAdmin (firstName, lastName, email, phoneNumber, idUser) VALUES
('Pande', 'Walker', 'pandewalker@gmail.com', '0456789231', 4);
CREATE TABLE infoUsers (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phoneNumber VARCHAR(10) NOT NULL UNIQUE,
    idUser INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES users(id)
);
INSERT INTO infoUsers (firstName, lastName, email, phoneNumber, idUser) VALUES
('Alan', 'Walker', 'alanwalker@gmail.com', '0123456789', 1),
('Charlie', 'Puth', 'charlieputh@gmail.com', '0111111111', 3),
('Ed', 'Sheeran', 'edsheeran@gmail.com', '0222222222', 2);
CREATE TABLE products (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(18,2) NOT NULL,
    discount INT,
    image VARCHAR(255) NULL, -- lưu đường dẫn ảnh
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO products (name, price, discount, image) VALUES
('Vertical Striped Shirt', 232, 20, NULL),
('T-shirt with Tape Details', 120, NULL, NULL),
('Courage Graphic T-shirt', 145, NULL, NULL);