CREATE DATABASE IF NOT EXISTS reportes;

USE reportes;

CREATE TABLE reporte_mensual_categoria (
    rut_usuario VARCHAR(12),
    mes INT,
    año INT,
    categoria VARCHAR(50),
    total_gasto DECIMAL(15, 2),
    PRIMARY KEY (rut_usuario, mes, año, categoria)
);

CREATE TABLE reporte_rango_monto (
    categoria VARCHAR(50),
    rango_monto VARCHAR(20),
    cantidad_transacciones INT,
    PRIMARY KEY (categoria, rango_monto)
);

CREATE TABLE reporte_promedio_diario (
    rut_usuario VARCHAR(12),
    categoria VARCHAR(50),
    promedio_diario DECIMAL(15, 2),
    PRIMARY KEY (rut_usuario, categoria)
);
