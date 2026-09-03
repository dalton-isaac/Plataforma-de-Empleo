-- ══════════════════════════════════════════════════════════════
-- schema_plpgsql.sql
-- ──────────────────
-- Triggers, Tablas de Auditoría y Procedimientos Almacenados (Stored Procedures)
-- para la base de datos PostgreSQL de TalentoEC.
-- ══════════════════════════════════════════════════════════════

-- ── 1. TABLA DE AUDITORÍA DE POSTULACIONES ────────────────────
CREATE TABLE IF NOT EXISTS auditoria_postulacion (
    id_auditoria SERIAL PRIMARY KEY,
    id_postulacion INT NOT NULL,
    estado_anterior VARCHAR(50),
    estado_nuevo VARCHAR(50),
    usuario_accion VARCHAR(150) DEFAULT CURRENT_USER,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── 2. TRIGGER FUNCTION: VALIDACIÓN DE REGLAS DE NEGOCIO AL POSTULAR ──
CREATE OR REPLACE FUNCTION fn_validar_postulacion()
RETURNS TRIGGER AS $$
DECLARE
    v_rol VARCHAR(50);
    v_activa BOOLEAN;
BEGIN
    -- Validar que quien postula tenga rol 'candidato'
    SELECT rol INTO v_rol FROM candidato WHERE id_candidato = NEW.id_candidato;
    IF v_rol IS NULL THEN
        RAISE EXCEPTION 'Error de Integridad: El candidato ID % no existe.', NEW.id_candidato;
    ELSIF v_rol <> 'candidato' THEN
        RAISE EXCEPTION 'Restricción de Negocio: Solo usuarios con rol candidato pueden postularse a vacantes. Rol actual: %', v_rol;
    END IF;

    -- Validar que la oferta exista y esté activa
    SELECT activo INTO v_activa FROM oferta_empleo WHERE id_oferta = NEW.id_oferta;
    IF v_activa IS NULL THEN
        RAISE EXCEPTION 'Error de Integridad: La oferta ID % no existe.', NEW.id_oferta;
    ELSIF v_activa = FALSE THEN
        RAISE EXCEPTION 'Restricción de Negocio: No es posible postularse a una oferta inactiva (ID: %).', NEW.id_oferta;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validar_postulacion ON postulacion;
CREATE TRIGGER trg_validar_postulacion
BEFORE INSERT ON postulacion
FOR EACH ROW
EXECUTE FUNCTION fn_validar_postulacion();


-- ── 3. TRIGGER: AUDITORÍA AUTOMÁTICA EN CAMBIOS DE FASE KANBAN ──
CREATE OR REPLACE FUNCTION fn_auditar_cambio_estado_postulacion()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.estado IS DISTINCT FROM NEW.estado THEN
        INSERT INTO auditoria_postulacion (id_postulacion, estado_anterior, estado_nuevo, fecha_cambio)
        VALUES (NEW.id_postulacion, OLD.estado, NEW.estado, CURRENT_TIMESTAMP);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_auditar_postulacion ON postulacion;
CREATE TRIGGER trg_auditar_postulacion
AFTER UPDATE OF estado ON postulacion
FOR EACH ROW
EXECUTE FUNCTION fn_auditar_cambio_estado_postulacion();


-- ── 4. STORED PROCEDURE 1: REGISTRO TRANSACCIONAL DE POSTULACIÓN ──
CREATE OR REPLACE PROCEDURE sp_registrar_postulacion(
    IN p_id_candidato INT,
    IN p_id_oferta INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_rol VARCHAR(50);
    v_activa BOOLEAN;
    v_count INT;
BEGIN
    -- 1. Validar existencia y rol de candidato
    SELECT rol INTO v_rol FROM candidato WHERE id_candidato = p_id_candidato;
    IF v_rol IS NULL THEN
        RAISE EXCEPTION 'El candidato ID % no existe.', p_id_candidato;
    ELSIF v_rol <> 'candidato' THEN
        RAISE EXCEPTION 'El usuario ID % no posee rol candidato (Rol: %).', p_id_candidato, v_rol;
    END IF;

    -- 2. Validar que la oferta exista y esté activa
    SELECT activo INTO v_activa FROM oferta_empleo WHERE id_oferta = p_id_oferta;
    IF v_activa IS NULL THEN
        RAISE EXCEPTION 'La oferta ID % no existe.', p_id_oferta;
    ELSIF v_activa = FALSE THEN
        RAISE EXCEPTION 'La oferta ID % se encuentra inactiva.', p_id_oferta;
    END IF;

    -- 3. Validar no duplicidad
    SELECT COUNT(*) INTO v_count FROM postulacion WHERE id_candidato = p_id_candidato AND id_oferta = p_id_oferta;
    IF v_count > 0 THEN
        RAISE EXCEPTION 'El candidato ID % ya se encuentra postulado a la oferta ID %.', p_id_candidato, p_id_oferta;
    END IF;

    -- 4. Inserción
    INSERT INTO postulacion (id_candidato, id_oferta, estado, fecha_postulacion)
    VALUES (p_id_candidato, p_id_oferta, 'Pendiente', CURRENT_DATE);
END;
$$;


-- ── 5. STORED PROCEDURE 2: ACTUALIZACIÓN DE FASE EN TABLERO KANBAN ──
CREATE OR REPLACE PROCEDURE sp_cambiar_fase_kanban(
    IN p_id_postulacion INT,
    IN p_nuevo_estado VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_nuevo_estado NOT IN ('Pendiente', 'En Evaluación', 'Entrevista', 'Aceptada', 'Rechazada') THEN
        RAISE EXCEPTION 'Fase inválida: %. Fases permitidas: Pendiente, En Evaluación, Entrevista, Aceptada, Rechazada', p_nuevo_estado;
    END IF;

    UPDATE postulacion
    SET estado = p_nuevo_estado
    WHERE id_postulacion = p_id_postulacion;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Postulación ID % no encontrada.', p_id_postulacion;
    END IF;
END;
$$;


-- ── 6. STORED PROCEDURE 3: PUBLICACIÓN SEGURA DE VACANTES CON VALIDACIONES ──
CREATE OR REPLACE PROCEDURE sp_publicar_oferta(
    IN p_id_empresa INT,
    IN p_titulo VARCHAR,
    IN p_salario NUMERIC,
    IN p_modalidad VARCHAR,
    IN p_anos_exp INT,
    IN p_ubicacion VARCHAR,
    IN p_funciones TEXT,
    IN p_requisitos TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_empresa_existe BOOLEAN;
BEGIN
    SELECT EXISTS(SELECT 1 FROM empresa WHERE id_empresa = p_id_empresa) INTO v_empresa_existe;
    IF NOT v_empresa_existe THEN
        RAISE EXCEPTION 'La empresa ID % no existe en el sistema.', p_id_empresa;
    END IF;

    IF p_salario IS NOT NULL AND p_salario < 460.00 THEN
        RAISE EXCEPTION 'El salario ofrecido ($%) no puede ser inferior al Salario Básico Unificado ($460.00 USD en Ecuador).', p_salario;
    END IF;

    IF p_anos_exp < 0 OR p_anos_exp > 20 THEN
        RAISE EXCEPTION 'Los años de experiencia requeridos (% años) deben estar en el rango de 0 a 20.', p_anos_exp;
    END IF;

    INSERT INTO oferta_empleo (
        id_empresa, titulo, salario, modalidad, anos_experiencia,
        ubicacion_exacta, funciones, requisitos_tecnicos, activo
    ) VALUES (
        p_id_empresa, p_titulo, p_salario, p_modalidad, p_anos_exp,
        p_ubicacion, p_funciones, p_requisitos, TRUE
    );
END;
$$;

