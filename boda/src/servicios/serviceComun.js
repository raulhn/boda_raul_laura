export async function peticionServicio(metodo, url, body) {
  const parametros = {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  if (body !== undefined) {
    parametros.body = JSON.stringify(body);
  }

  const response = await fetch(url, parametros);
  const contenido = await response.text();
  let data = null;

  if (contenido) {
    try {
      data = JSON.parse(contenido);
    } catch {
      data = { message: contenido };
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
        data?.message ||
        `La petición ha fallado con el código ${response.status}`,
    );
  }

  return data;
}
