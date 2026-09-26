-- Align existing installations with create_table_tokens_mesa.sql.
-- Tokens are generated securely by servlet_admin.js after this migration.
ALTER TABLE tabla_tokens_mesa
    ADD COLUMN IF NOT EXISTS token VARCHAR(64) NULL AFTER id;

UPDATE tabla_tokens_mesa
SET activo = FALSE
WHERE token IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_tabla_tokens_mesa_token
    ON tabla_tokens_mesa (token);
