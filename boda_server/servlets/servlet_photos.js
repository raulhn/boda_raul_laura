import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { consulta } from '../bd/wrapperBD.js';

// Setup storage for photos
const PHOTO_DIR = 'uploads/photos';
if (!fs.existsSync(PHOTO_DIR)) {
  fs.mkdirSync(PHOTO_DIR, { recursive: true });
}

// Multer configuration to store files
const storage = multer.diskStorage({
  destination: (req, err, cb) => cb(null, PHOTO_DIR),
  filename: (req, err, cb) => {
    const mesaId = req.session?.mesa_id;
    const retoId = req.body.reto_id;
    // Generates a unique filename
    cb(null, `${mesaId}_${retoId}-${Date.now()}-${req.file.originalname}`);
  }
});

const photoUploadMiddleware = multer({ storage }).single('foto');

export function subirFoto(req, res) {
  // Authentication is handled by the middleware, but we check for required data.
  if (!req.session?.mesa_id || !req.body.reto_id || !req.file) {
    return res.status(400).json({ error: "Missing table_id, challenge_id, or photo file." });
  }

  const mesaId = req.session.mesa_id;
  const retoId = req.body.reto_id;
  const rutaFoto = req.file.filename;

  // The full path on the server
  const fullPath = path.join(PHOTO_DIR, rutaFoto);
  // The public URL representation
  const publicUrl = `/static/photos/${rutaFoto}`;

  // 1. Save the file (Multer handles saving to disk)

  // 2. Register the photo in the database
  const sql = `INSERT INTO tabla_foto_retos (id_mesa, id_reto, ruta_foto) VALUES (?, ?, ?);`;

  consulta(sql, [mesaId, retoId, rutaFoto])
    .then(() => {
      console.log(`Photo successfully uploaded and registered: ${rutaFoto}`);
      res.json({ success: true, url: publicUrl });
    })
    .catch(error => {
      console.error("Database error on photo upload:", error);
      // Clean up the uploaded file if DB registration fails
      fs.unlink(fullPath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
      res.status(500).json({ error: "Failed to register photo in database." });
    });
}
