import { URL_API } from "../constantes.js";
import { peticionServicio } from "./serviceComun.js";

export function obtenerTokensMesas() {
  return peticionServicio("GET", `${URL_API}/admin/tokens-mesa`);
}

export function generarTokenMesa(idMesa) {
  return peticionServicio("POST", `${URL_API}/admin/mesas/${idMesa}/token`);
}
