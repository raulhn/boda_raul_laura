import * as Gestor_Mesa from "../logica/mesas.js";

export async function insertarMesa(req, res) {
  try {
    const { nombreMesa, descripcion } = req.body;
    await Gestor_Mesa.insertaMesa(nombreMesa, descripcion);
    res.status(200).json({ message: "Mesa insertada correctamente" });
  } catch (error) {
    console.error("Error en la función insertarMesa:", error);
    res.status(500).json({ error: "Error al insertar la mesa" });
  }
}

export async function eliminarMesa(req, res) {
  try {
    const { idMesa } = req.params;
    const resultado = await Gestor_Mesa.eliminarMesa(idMesa);
    if (resultado) {
      res.status(200).json({ message: "Mesa eliminada correctamente" });
    } else {
      res.status(404).json({ error: "Mesa no encontrada" });
    }
  } catch (error) {
    console.error("Error en la función eliminarMesa:", error);
    res.status(500).json({ error: "Error al eliminar la mesa" });
  }
}

export async function actualizarMesa(req, res) {
  try {
    const { idMesa, nombreMesa, descripcion } = req.body;
    const resultado = await Gestor_Mesa.actualizarMesa(
      idMesa,
      nombreMesa,
      descripcion,
    );
    if (resultado) {
      res.status(200).json({ message: "Mesa actualizada correctamente" });
    } else {
      res.status(404).json({ error: "Mesa no encontrada" });
    }
  } catch (error) {
    console.error("Error en la función actualizarMesa:", error);
    res.status(500).json({ error: "Error al actualizar la mesa" });
  }
}

export async function obtenerMesas(req, res) {
  try {
    const mesas = await Gestor_Mesa.obtenerMesas();
    res.status(200).json({ error: false, mesas: mesas });
  } catch (error) {
    console.error("Error en la función obtenerMesas:", error);
    res.status(500).json({ error: "Error al obtener las mesas" });
  }
}
