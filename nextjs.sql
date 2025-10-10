CREATE DATABASE nextjs
GO
USE nextjs
GO
CREATE TABLE users(
    id INT IDENTITY NOT NULL PRIMARY KEY,
    username NVARCHAR(20) NOT NULL UNIQUE,
    password NVARCHAR(20) NOT NULL,
    role NVARCHAR(20) NOT NULL DEFAULT 'client' 
)
GO
INSERT INTO users VALUES
(N'user1', N'@user123', N'client'),
(N'user2', N'@user456', N'client'),
(N'user3', N'@user789', N'client'),
(N'admin', N'@admin123', N'admin')
GO
CREATE TABLE infoAdmin(
    id INT IDENTITY NOT NULL PRIMARY KEY,
    firstName NVARCHAR(30) NOT NULL,
    lastName NVARCHAR(30) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    phoneNumber NVARCHAR(10) NOT NULL UNIQUE,
    idUser INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES users(id)
)
GO
INSERT INTO infoAdmin VALUES
(N'Pande', N'Walker', N'pandewalker@gmail.com', N'0456789231', 4)
GO
CREATE TABLE infoUsers(
    id INT IDENTITY NOT NULL PRIMARY KEY,
    firstName NVARCHAR(30) NOT NULL,
    lastName NVARCHAR(30) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    phoneNumber NVARCHAR(10) NOT NULL UNIQUE,
    idUser INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES users(id)
)
GO
INSERT INTO infoUsers VALUES
(N'Alan', N'Walker', N'alanwalker@gmail.com', N'0123456789', 1),
(N'Charlie', N'Puth', N'charlieputh@gmail.com', N'0111111111', 3),
(N'Ed', N'Sheeran', N'edsheeran@gmail.com', N'0222222222', 2)
GO
CREATE TABLE products (
    id INT IDENTITY NOT NULL PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    price DECIMAL(18,2) NOT NULL,
    discount INT,
    image NVARCHAR(255) NULL, -- lưu đường dẫn ảnh (URL hoặc tên file)
    created_at DATETIME DEFAULT GETDATE()
);
GO
INSERT INTO products (name, price, discount, image)
VALUES 
(N'Vertical Striped Shirt', 232, 20, null),
(N'T-shirt with Tape Details', 120, '', null),
(N'Courage Graphic T-shirt', 145, '', null);
GO
