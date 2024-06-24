CREATE DATABASE ExamenDeveloperDB;
GO
USE ExamenDeveloperDB;
GO

CREATE TABLE Clientes (
    ClienteId INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(50),
    Apellidos NVARCHAR(50),
    Direccion NVARCHAR(100),
    Email NVARCHAR(100),
    Password NVARCHAR(100)
);

CREATE TABLE Tienda (
    TiendaId INT PRIMARY KEY IDENTITY,
    Sucursal NVARCHAR(50),
    Direccion NVARCHAR(100)
);

CREATE TABLE Articulos (
    ArticuloId INT PRIMARY KEY IDENTITY,
    Codigo NVARCHAR(50),
    Descripcion NVARCHAR(100),
    Precio DECIMAL(18, 2),
    Imagen NVARCHAR(MAX),
    Stock INT
);

CREATE TABLE ArticuloTienda (
    ArticuloId INT,
    TiendaId INT,
    Fecha DATE,
    PRIMARY KEY (ArticuloId, TiendaId),
    FOREIGN KEY (ArticuloId) REFERENCES Articulos(ArticuloId),
    FOREIGN KEY (TiendaId) REFERENCES Tienda(TiendaId)
);

CREATE TABLE ClienteArticulo (
    ClienteId INT,
    ArticuloId INT,
    Fecha DATE,
    Cantidad INT,
    PRIMARY KEY (ClienteId, ArticuloId),
    FOREIGN KEY (ClienteId) REFERENCES Clientes(ClienteId),
    FOREIGN KEY (ArticuloId) REFERENCES Articulos(ArticuloId)
);
