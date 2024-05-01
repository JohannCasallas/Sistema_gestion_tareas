-- Creacion de la base de datos 
CREATE DATABASE Sistema_gestion_Tareas_DB;
USE Sistema_gestion_Tareas_DB;


-- Creacion de la Tabla Usuarios
CREATE TABLE Usuarios (
	IdUsuario INT PRIMARY KEY IDENTITY,
	NombreUsuario NVARCHAR(50),
	ApellidoUsuario NVARCHAR(50),
	correoElectronico NVARCHAR(70),
	Contraseña NVARCHAR(50),
	FechaCreacion DATETIME DEFAULT GETDATE(),
	FechaConexion DATETIME DEFAULT GETDATE()
);


-- Creacion de la Tabla Tareas
CREATE TABLE Tareas (
	IdTarea INT PRIMARY KEY iDENTITY,
	IdUsuario INT,
	FOREIGN KEY (IdUsuario) REFERENCES Usuarios(IdUsuario),
	NombreTarea NVARCHAR(50),
	DescripcionTarea NVARCHAR(100),
	NivelTarea NVARCHAR(50),
	EstadoTarea BIT
);

-- Datos prueba Tabla Usuarios
INSERT INTO Usuarios (NombreUsuario, ApellidoUsuario, correoElectronico, Contraseña)
VALUES ( 'Johann', 'Casallas', 'Johann@gamil.com', 'Johann123*'),
	   ( 'Juan', 'Perez', 'Juan@gamil.com', 'Juan123*'),
	   ( 'Maria', 'Gomez', 'Maria@gamil.com', 'Maria123*'),
	   ( 'Angela', 'Rodriguez', 'Angela@gamil.com', 'Angela123*');

--Datos Prueba Tabla Tareas Usuario 1
INSERT INTO Tareas(IdUsuario, NombreTarea, DescripcionTarea, NivelTarea, EstadoTarea)
VALUES (1, 'Completar informe', 'Completar el informe mensual de ventas', 'Alto', 0),
       (1, 'Reunión de equipo', 'Organizar reunión semanal de equipo', 'Medio', 1),
       (1, 'Actualizar sitio web', 'Actualizar contenido y diseño del sitio web', 'Bajo', 0),
       (1, 'Preparar presentación', 'Preparar presentación para reunión de clientes', 'Medio', 1);

--Datos Prueba Tabla Tareas Usuario 2
INSERT INTO Tareas(IdUsuario, NombreTarea, DescripcionTarea, NivelTarea, EstadoTarea)
VALUES (2, 'Revisar presupuesto', 'Revisar y ajustar el presupuesto mensual', 'Bajo', 1),
       (2, 'Planificar estrategia de marketing', 'Elaborar estrategias para la próxima campaña de marketing', 'Bajo', 1),
       (2, 'Realizar pruebas de software', 'Realizar pruebas de rendimiento y funcionalidad del software', 'Bajo', 0);

--Datos Prueba Tabla Tareas Usuario 3
INSERT INTO Tareas(IdUsuario, NombreTarea, DescripcionTarea, NivelTarea, EstadoTarea)
VALUES (3, 'Investigar nuevas tecnologías', 'Investigar nuevas tecnologías para mejorar la infraestructura', 'Alto', 1),
       (3, 'Desarrollar prototipo de aplicación móvil', 'Desarrollar un prototipo de aplicación móvil para pruebas de concepto', 'Medio', 0),
       (3, 'Realizar análisis de datos', 'Realizar análisis de datos para identificar tendencias y patrones', 'Bajo', 1);

