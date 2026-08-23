import * as Gestor_Retos from "../logica/retos.js";

export async function insertarReto(req, res) {
  try {
    const { nombreReto, descripcion, estado, icono } = req.body;
    await Gestor_Retos.insertaReto(nombreReto, descripcion, estado, icono);
    res.status(200).json({ message: "Reto insertado correctamente" });
  } catch (error) {
    console.error("Error en la función insertarReto:", error);
    res.status(500).json({ error: "Error al insertar el reto" });
  }
}

export async function eliminarReto(req, res) {
  try {
    const { idReto } = req.params;
    const resultado = await Gestor_Retos.eliminarReto(idReto);
    if (resultado) {
      res.status(200).json({ message: "Reto eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Reto no encontrado" });
    }
  } catch (error) {
    console.error("Error en la función eliminarReto:", error);
    res.status(500).json({ error: "Error al eliminar el reto" });
  }
}

export async function actualizarReto(req, res) {
  try {
    const { idReto, nombreReto, descripcion, estado, icono } = req.body;
    const resultado = await Gestor_Retos.actualizarReto(
      idReto,
      nombreReto,
      descripcion,
      estado,
      icono,
    );
    if (resultado) {
      res.status(200).json({ message: "Reto actualizado correctamente" });
    } else {
      res.status(404).json({ error: "Reto no encontrado" });
    }
  } catch (error) {
    console.error("Error en la función actualizarReto:", error);
    res.status(500).json({ error: "Error al actualizar el reto" });
  }
}

export async function obtenerRetos(req, res) {
  try {
    const retos = await Gestor_Retos.obtenerRetos();
    res.status(200).json({ error: false, retos: retos });
  } catch (error) {
    console.error("Error en la función obtenerRetos:", error);
    res.status(500).json({ error: "Error al obtener los retos" });
  }
}
