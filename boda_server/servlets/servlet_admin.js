import { consulta } from "../bd/wrapperBD.js";
import jwt from "jsonwebtoken";
import * as Gestor_Mesa from "../logica/mesas.js";

/**
 * Endpoint administrativo para generar nuevos tokens de sesión para todas las mesas.
 * Este endpoint debe estar protegido por un middleware que verifique los permisos de 'admin'.
 * Requiere que la estructura de la DB tenga una columna 'token' y 'id_mesa' para las mesas.
 */
export async function generarTokensParaMesas(req, res) {
    try {
        // Obtener todas las mesas registradas
        const mesas = await Gestor_Mesa.obtenerMesas();
        
        if (!mesas || mesas.length === 0) {
            return res.status(200).json({ message: "No hay mesas registradas para generar tokens." });
        }

        const tokensGenerados = [];

        // Iterar sobre cada mesa y generar un nuevo token
        for (const mesa of mesas) {
            const idMesa = mesa.id; // Asumiendo que el objeto mesa tiene un campo 'id'
            
            // Generar un nuevo token de sesión
            const sessionData = { mesas_id: idMesa };
            // Usamos una clave secreta que debería ser segura y solo conocida por el admin
            const nuevoToken = jwt.sign(sessionData, "SECRET_ADMIN_KEY_TOKEN_TOKEN_GEN", { expiresIn: "7d" }); 

            // Actualizar el token en la base de datos
            try {
                // SQL para reemplazar el token existente por uno nuevo en la tabla de tokens
                const sql = "UPDATE tabla_mesas_tokens SET token = ? WHERE id_mesa = ?";
                await consulta(sql, [nuevoToken, idMesa]);

                tokensGenerados.push({ id: idMesa, token: nuevoToken });
            } catch (dbError) {
                console.error(`Error actualizando token para la mesa ${idMesa}:`, dbError);
                // Continuamos con la siguiente mesa si una falla
            }
        }

        // Respuesta exitosa
        return res.status(200).json({ 
            message: `Tokens generados y actualizados para ${tokensGenerados.length} mesas.`,
            tokens: tokensGenerados 
        });

    } catch (error) {
        console.error("Error al generar tokens para mesas:", error);
        return res.status(500).json({ error: "Error interno al procesar la generación de tokens." });
    }
}