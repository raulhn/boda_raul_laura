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
    // Get the mesa_id from the session for guests/token users
    const token = req.cookies.session_cookie;
    const usuario = await obtenerTokenUsuario(token);
    const mesaID = usuario.mesa_id;
    // Call Gestor_Retos.obtenerRetos with the required filtering ID
    const retos = await Gestor_Retos.obtenerRetos(mesaID);

    res.status(200).json({ error: false, retos: retos });
  } catch (error) {
    console.error("Error en la función obtenerRetos:", error);
    res.status(500).json({ error: "Error al obtener los retos" });
  }
}

export async function obtenerRetosMesa(req, res) {
  try {
    const token = req.cookies.session_cookie;
    const usuario = await obtenerTokenUsuario(token);
    const mesaID = usuario.mesa_id;
    if (!mesaID) {
      return res
        .status(400)
        .json({ error: "El ID de la mesa es obligatorio." });
    }

    const retos = await Gestor_Retos.obtenerRetosMesa(mesaID);
    return res.status(200).json({ error: false, retos: retos });
  } catch (error) {
    console.error("Error en la función obtenerRetosMesa:", error);
    return res
      .status(500)
      .json({ error: "Error al obtener los retos de la mesa." });
  }
}

export async function asignarRetoAMesa(req, res) {
  try {
    const { idMesa, idReto, estado } = req.body;
    if (!idMesa || !idReto) {
      return res
        .status(400)
        .json({ error: "La mesa y el reto son obligatorios." });
    }

    await Gestor_Retos.asignarRetoAMesa(idMesa, idReto, estado);
    return res.status(201).json({ message: "Reto asignado correctamente." });
  } catch (error) {
    console.error("Error en la función asignarRetoAMesa:", error);
    return res
      .status(500)
      .json({ error: "Error al asignar el reto a la mesa." });
  }
}

export async function asignarRetosMesas(req, res) {
  try {
    await Gestor_Retos.asignarRetosMesas();
    return res.status(201).json({ message: "Retos asignados correctamente." });
  } catch (error) {
    console.error("Error en la función asignarRetosMesas:", error);
    return res
      .status(500)
      .json({ error: "Error al asignar los retos a las mesas." });
  }
}
