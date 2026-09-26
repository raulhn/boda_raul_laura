import * as wrapperBD from "../bd/wrapperBD.js";
import pool from "../bd/conexion.js";

export const RETOS_POR_MESA = 5;

const CATEGORIAS_RETO = [
  { nombre: "Bonitos", patron: /\bbonit[oa]s?\b/ },
  { nombre: "Búsqueda", patron: /\bbusqueda\b/ },
  { nombre: "Con los novios", patron: /\bcon (?:los )?novios\b/ },
  { nombre: "Difíciles", patron: /\bdificil(?:es)?\b/ },
  { nombre: "Divertidas", patron: /\bdivertid[oa]s?\b/ },
  { nombre: "Durante la Fiesta", patron: /\bdurante la fiesta\b/ },
  { nombre: "En la Boda", patron: /\ben la boda\b/ },
  { nombre: "Fáciles", patron: /\bfacil(?:es)?\b/ },
  { nombre: "Interacción", patron: /\binteracci(?:on|ones)\b/ },
];

function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-ES");
}

export function obtenerCategoriaReto(nombreReto) {
  const nombreNormalizado = normalizarTexto(nombreReto);
  return CATEGORIAS_RETO.find(({ patron }) => patron.test(nombreNormalizado))
    ?.nombre;
}

function seleccionarRetosEquilibrados(retosPorCategoria, asignacionesPorCategoria) {
  const categoriasSeleccionables = [...retosPorCategoria.keys()];
  if (categoriasSeleccionables.length < RETOS_POR_MESA) {
    throw new Error(
      `Se necesitan retos activos de al menos ${RETOS_POR_MESA} categorías para cada mesa.`,
    );
  }

  const categoriasSeleccionadas = categoriasSeleccionables
    .sort(
      (categoriaA, categoriaB) =>
        asignacionesPorCategoria.get(categoriaA) -
          asignacionesPorCategoria.get(categoriaB) || Math.random() - 0.5,
    )
    .slice(0, RETOS_POR_MESA);

  return categoriasSeleccionadas.map((categoria) => {
    const retosCategoria = retosPorCategoria.get(categoria);
    const reto =
      retosCategoria[Math.floor(Math.random() * retosCategoria.length)];
    asignacionesPorCategoria.set(
      categoria,
      asignacionesPorCategoria.get(categoria) + 1,
    );
    return reto;
  });
}

async function obtenerRetosActivosPorCategoria() {
  const retos = await wrapperBD.consulta(
    "SELECT id_reto, nombre_reto FROM retos WHERE estado = 'activo'",
  );
  const retosPorCategoria = new Map();

  for (const reto of retos) {
    const categoria = obtenerCategoriaReto(reto.nombre_reto);
    if (!categoria) {
      continue;
    }
    const retosCategoria = retosPorCategoria.get(categoria) ?? [];
    retosCategoria.push(reto);
    retosPorCategoria.set(categoria, retosCategoria);
  }

  return retosPorCategoria;
}

async function guardarAsignacionRetos(idMesa, retos) {
  await wrapperBD.actualiza(
    "UPDATE mesa_retos SET estado = 'inactivo' WHERE id_mesa = ?",
    [idMesa],
  );

  for (const reto of retos) {
    await asignarRetoAMesa(idMesa, reto.id_reto, "activo");
  }
}

export async function obtenerRetos(idMesa = null) {
  try {
    let sql = "select * from retos";
    let params = [];

    if (idMesa) {
      sql = `
        select r.*, fr.ruta_foto
        from retos r
        join mesa_retos mr on r.id_reto = mr.id_reto
        left join foto_retos fr
          on fr.id_mesa = mr.id_mesa and fr.id_reto = mr.id_reto
        where mr.id_mesa = ? and mr.estado = 'activo'
      `;
      params = [idMesa];
    }

    const results = await wrapperBD.consulta(sql, params);
    return results;
  } catch (error) {
    console.error("Error en la función obtenerRetos:", error);
    throw new Error("Error en la función obtenerRetos");
  }
}

export async function obtenerRetosMesa(idMesa) {
  try {
    const sql = `
      select r.*, fr.ruta_foto
      from retos r
      join mesa_retos mr on r.id_reto = mr.id_reto
      left join foto_retos fr
        on fr.id_mesa = mr.id_mesa and fr.id_reto = mr.id_reto
      where mr.id_mesa = ? and mr.estado = 'activo'
    `;
    const results = await wrapperBD.consulta(sql, [idMesa]);
    return results;
  } catch (error) {
    console.error("Error en la función obtenerRetosMesa:", error);
    throw new Error("Error en la función obtenerRetosMesa");
  }
}

export async function obtenerRetosAsignadosMesas() {
  try {
    return await wrapperBD.consulta(`
      SELECT
        m.id_mesa,
        m.nombre_mesa,
        r.id_reto,
        r.nombre_reto,
        r.descripcion,
        r.icono
      FROM mesa m
      LEFT JOIN mesa_retos mr
        ON mr.id_mesa = m.id_mesa AND mr.estado = 'activo'
      LEFT JOIN retos r ON r.id_reto = mr.id_reto
      ORDER BY m.nombre_mesa, r.nombre_reto
    `);
  } catch (error) {
    console.error("Error en la función obtenerRetosAsignadosMesas:", error);
    throw new Error("Error en la función obtenerRetosAsignadosMesas");
  }
}

export async function insertaReto(nombreReto, descripcion, estado, icono) {
  try {
    const sql =
      "insert into retos (nombre_reto, descripcion, estado, icono) values (" +
      pool.escape(nombreReto) +
      ", " +
      pool.escape(descripcion) +
      ", " +
      pool.escape(estado) +
      ", " +
      pool.escape(icono) +
      ")";

    const results = await wrapperBD.actualiza(sql);
    return results.insertId;
  } catch (error) {
    console.error("Error en la función insertaReto:", error);
    throw new Error("Error en la función insertaReto");
  }
}

export async function actualizarReto(
  idReto,
  nombreReto,
  descripcion,
  estado,
  icono,
) {
  try {
    const sql =
      "update retos set nombre_reto = " +
      pool.escape(nombreReto) +
      ", descripcion = " +
      pool.escape(descripcion) +
      ", estado = " +
      pool.escape(estado) +
      ", icono = " +
      pool.escape(icono) +
      " where id_reto = " +
      pool.escape(idReto);

    const results = await wrapperBD.actualiza(sql);
    return results.affectedRows > 0;
  } catch (error) {
    console.error("Error en la función actualizarReto:", error);
    throw new Error("Error en la función actualizarReto");
  }
}

export async function eliminarReto(idReto) {
  try {
    const sql = "delete from retos where id_reto = " + pool.escape(idReto);
    const results = await wrapperBD.actualiza(sql);
    return results.affectedRows > 0;
  } catch (error) {
    console.error("Error en la función eliminarReto:", error);
    throw new Error("Error en la función eliminarReto");
  }
}

export async function obtenerRetoPorId(idReto) {
  try {
    const sql = "select * from retos where id_reto = " + pool.escape(idReto);
    const results = await wrapperBD.consulta(sql);
    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error en la función obtenerRetoPorId:", error);
    throw new Error("Error en la función obtenerRetoPorId");
  }
}

export async function asignarRetoAMesa(idMesa, idReto, estado = "activo") {
  try {
    const resultado = await wrapperBD.actualiza(
      "UPDATE mesa_retos SET estado = ? WHERE id_mesa = ? AND id_reto = ?",
      [estado, idMesa, idReto],
    );
    if (resultado.affectedRows === 0) {
      await wrapperBD.actualiza(
        "INSERT INTO mesa_retos (id_mesa, id_reto, estado) VALUES (?, ?, ?)",
        [idMesa, idReto, estado],
      );
    }
  } catch (error) {
    console.error("Error en la función asignarRetoAMesa:", error);
    throw new Error("Error en la función asignarRetoAMesa");
  }
}

export async function asignarRetosMesas() {
  try {
    const mesas = await wrapperBD.consulta("SELECT id_mesa FROM mesa");
    const retosPorCategoria = await obtenerRetosActivosPorCategoria();
    const asignacionesPorCategoria = new Map(
      [...retosPorCategoria.keys()].map((categoria) => [categoria, 0]),
    );

    for (const mesa of mesas) {
      const retos = seleccionarRetosEquilibrados(
        retosPorCategoria,
        asignacionesPorCategoria,
      );
      await guardarAsignacionRetos(mesa.id_mesa, retos);
    }
  } catch (error) {
    console.error("Error en la función asignarRetosAMesa:", error);
    throw error;
  }
}

export async function asignarRetosMesa(idMesa) {
  try {
    const retosPorCategoria = await obtenerRetosActivosPorCategoria();
    const asignacionesPorCategoria = new Map(
      [...retosPorCategoria.keys()].map((categoria) => [categoria, 0]),
    );
    const retos = seleccionarRetosEquilibrados(
      retosPorCategoria,
      asignacionesPorCategoria,
    );
    await guardarAsignacionRetos(idMesa, retos);
  } catch (error) {
    console.error("Error en la función asignarRetosMesa:", error);
    throw error;
  }
}
