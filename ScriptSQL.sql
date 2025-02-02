CREATE TABLE rol (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NULL
);
INSERT INTO rol (id, nombre)
VALUES (1, 'Empleado'),
    (2, 'Administrador');
CREATE TABLE empleados (
    id SERIAL PRIMARY KEY,
    fecha_ingreso TIMESTAMP NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    salario INT NOT NULL
);
CREATE TABLE solicitud (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    resumen VARCHAR(255) NOT NULL,
    "empleadoId" INT NOT NULL,
    FOREIGN KEY ("empleadoId") REFERENCES empleados(id) ON DELETE CASCADE
);
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    "rolId" INT NOT NULL,
    "empleadoId" INT NOT NULL,
    FOREIGN KEY ("empleadoId") REFERENCES empleados(id),
    FOREIGN KEY ("rolId") REFERENCES rol(id)
);
INSERT INTO empleados (id, fecha_ingreso, nombre, salario)
values (0, '2025-01-01', 'admin', 100);
INSERT INTO usuarios (id, correo, password, "rolId", "empleadoId")
VALUES (
        1,
        'admin@admin.com',
        '$2a$10$2kyo9kaog7X.ZCXagAAao.afv0jOZ1lmNojdmQyL1sTcVwogOvjqm',
        2,
        0
    );