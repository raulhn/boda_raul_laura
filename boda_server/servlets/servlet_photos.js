import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { actualiza, consulta } from "../bd/wrapperBD.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
export const PHOTO_DIR = path.resolve(currentDirectory, "../uploads/photos");

fs.mkdirSync(PHOTO_DIR, { recursive: true });

const extensionsByMimeType = {
  "image/heic": ".heic",
  "image/heif": ".heif",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, PHOTO_DIR),
  filename: (_req, file, callback) =>
    callback(null, `${crypto.randomUUID()}${extensionsByMimeType[file.mimetype]}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!extensionsByMimeType[file.mimetype]) {
      return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "foto"));
    }
    return callback(null, true);
  },
}).single("foto");

export function procesarSubida(req, res, next) {
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ error: "La foto debe ser JPG, PNG, WEBP, HEIC o HEIF y pesar hasta 10 MB." });
    }
    if (error) {
      return next(error);
    }
    return next();
  });
}

async function eliminarFichero(nombreFichero) {
  try {
    await fs.promises.unlink(path.join(PHOTO_DIR, nombreFichero));
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("No se ha podido eliminar la foto subida:", error);
    }
  }
}

export async function subirFoto(req, res) {
  const retoId = req.body.retoId ?? req.body.reto_id;
  const mesaId = req.session?.mesa_id;

  if (!mesaId || !Number.isInteger(Number(retoId)) || !req.file) {
    if (req.file) {
      await eliminarFichero(req.file.filename);
    }
    return res
      .status(400)
      .json({ error: "Se requieren una sesión de mesa, un reto válido y una foto." });
  }

  try {
    const retosAsignados = await consulta(
      `SELECT 1
       FROM mesa_retos
       WHERE id_mesa = ? AND id_reto = ? AND estado = 'activo'`,
      [mesaId, retoId],
    );

    if (retosAsignados.length === 0) {
      await eliminarFichero(req.file.filename);
      return res.status(403).json({ error: "El reto no está asignado a esta mesa." });
    }

    await actualiza(
      "INSERT INTO foto_retos (id_mesa, id_reto, ruta_foto) VALUES (?, ?, ?)",
      [mesaId, retoId, req.file.filename],
    );

    return res.status(201).json({
      success: true,
      url: `/static/photos/${req.file.filename}`,
    });
  } catch (error) {
    await eliminarFichero(req.file.filename);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ error: "Esta mesa ya ha subido una foto para el reto." });
    }

    console.error("Error al registrar la foto:", error);
    return res.status(500).json({ error: "No se ha podido registrar la foto." });
  }
}
