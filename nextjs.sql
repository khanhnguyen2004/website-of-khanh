CREATE DATABASE nextjs
GO
USE nextjs
GO
CREATE TABLE users(
    id INT IDENTITY NOT NULL PRIMARY KEY,
    username NVARCHAR(20) NOT NULL,
    password NVARCHAR(20) NOT NULL
)
GO
INSERT INTO users VALUES
(N'user1', N'@user123'),
(N'user2', N'@user456'),
(N'user3', N'@user789')
GO
CREATE TABLE infoUsers(
    id INT IDENTITY NOT NULL PRIMARY KEY,
    firstName NVARCHAR(30),
    lastName NVARCHAR(30),
    email NVARCHAR(255),
    numberPhone NVARCHAR(10),
    idUser INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES users(id)
)
GO
INSERT INTO infoUsers VALUES
(N'Alan', N'Walker', N'alanwalker@gmail.com', N'0123456789', 1),
(N'Charlie', N'Puth', N'charlieputh@gmail.com', N'0111111111', 3),
(N'Ed', N'Sheeran', N'edsheeran@gmail.com', N'0222222222', 2)