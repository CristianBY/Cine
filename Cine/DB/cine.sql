CREATE DATABASE Cine DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE Cine;


CREATE TABLE Pelicula
  (
    titulo       VARCHAR (50) NOT NULL PRIMARY KEY ,
    anyo         VARCHAR (4) NOT NULL ,
    pais         VARCHAR (30) NOT NULL ,
    genero       VARCHAR (20) NOT NULL ,
    calificacion VARCHAR (3) NOT NULL ,
    duracion     VARCHAR (15) NOT NULL ,
    estreno      DATE NOT NULL ,
    sinopsis     TEXT NOT NULL
  ) ;



CREATE TABLE Proyeccion
  (
    idProyeccion INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    fecha        DATE NOT NULL ,
    hora         TIME NOT NULL ,
    titulo       VARCHAR (50) NOT NULL ,
    idSala       VARCHAR (2) NOT NULL ,
    idTarifa     INT NOT NULL
  ) ;


CREATE TABLE Reserva
  (
    idReserva    INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    butacas      INT NOT NULL ,
    idProyeccion INT NOT NULL ,
    idUsuario    INT NOT NULL
  ) ;


CREATE TABLE Sala
  (
    idSala VARCHAR (2) NOT NULL PRIMARY KEY ,
    aforo  INT NOT NULL ,
    tipo3D BOOLEAN NOT NULL
  ) ;


CREATE TABLE Tarifa
  (
    idTarifa    INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    nombre      VARCHAR (20) NOT NULL,
    descripcion VARCHAR (75) NOT NULL ,
    precio      DECIMAL (4,2) NOT NULL
  ) ;


CREATE TABLE Usuario
  (
    idUsuario       INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    nombre          VARCHAR (50) NOT NULL ,
    apellidos       VARCHAR (50) NOT NULL ,
    psw             VARCHAR (32) NOT NULL ,
    email           VARCHAR (50) NOT NULL ,
    administrador   BOOLEAN NOT NULL
  ) ;


CREATE TABLE Valoracion
  (
    valoracion INT NOT NULL ,
    idUsuario  INT NOT NULL ,
    titulo     VARCHAR (50) NOT NULL
  ) ;


ALTER TABLE Proyeccion ADD CONSTRAINT Proyeccion_Pelicula_FK FOREIGN KEY ( titulo ) REFERENCES Pelicula ( titulo ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Proyeccion ADD CONSTRAINT Proyeccion_Sala_FK FOREIGN KEY ( idSala ) REFERENCES Sala ( idSala ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Proyeccion ADD CONSTRAINT Proyeccion_Tarifa_FK FOREIGN KEY ( idTarifa ) REFERENCES Tarifa ( idTarifa ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Reserva ADD CONSTRAINT Reserva_Proyeccion_FK FOREIGN KEY ( idProyeccion ) REFERENCES Proyeccion ( idProyeccion ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Reserva ADD CONSTRAINT Reserva_Usuario_FK FOREIGN KEY ( idUsuario ) REFERENCES Usuario ( idUsuario ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Valoracion ADD CONSTRAINT Valoracion_Pelicula_FK FOREIGN KEY ( titulo ) REFERENCES Pelicula ( titulo ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Valoracion ADD CONSTRAINT Valoracion_Usuario_FK FOREIGN KEY ( idUsuario ) REFERENCES Usuario ( idUsuario ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Usuario ADD CONSTRAINT unique_email UNIQUE KEY(email);