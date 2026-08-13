-- 1. Comando de conexión (exclusivo para psql / pgcli si ya creaste la BD a mano)
-- \c gamelog_db;

-- 2. DDL: Creación de la tabla de juegos
CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Pendiente', 'Jugando', 'Completado')),
    score INT CHECK (score >= 1 AND score <= 10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. DML: Datos de prueba (Al menos 5 juegos)
INSERT INTO games (title, platform, status, score) VALUES
('Elden Ring', 'PC', 'Completado', 10),
('God of War Ragnarok', 'PlayStation', 'Jugando', 9),
('Halo Infinite', 'Xbox', 'Pendiente', 7),
('Zelda: Tears of the Kingdom', 'Nintendo', 'Completado', 10),
('Cyberpunk 2077', 'PC', 'Jugando', 8);

-- 4. CONSULTAS DE VERIFICACIÓN (Queries para probar que todo funciona)
-- Consulta A: Listar todos los juegos
SELECT * FROM games;

-- Consulta B: Listar solo los juegos con estado 'Jugando'
SELECT * FROM games WHERE status = 'Jugando';

-- Consulta C: Listar juegos con puntuación mayor o igual a 9
SELECT title, score FROM games WHERE score >= 9;
