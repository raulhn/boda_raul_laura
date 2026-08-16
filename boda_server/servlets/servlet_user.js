import * as Usuario from "../logica/user.js";
import * as constantes from "../constantes.js";

export async function login(req, res) {
  try {
    const { login, password } = req.body;
    const usuarioRecuperado = await Usuario.login(login, password);
    if (!usuarioRecuperado) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    } else if (usuarioRecuperado.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    } else {
      if (
        await Usuario.comparar_passwords(
          password,
          usuarioRecuperado[0].password,
        )
      ) {
        const user = { name: username };
        const accessToken = jwt.sign(user, process.env.TOKENAUTH);

        res.cookie(constantes.ACCESS_TOKEN, tokens.accessToken, {
          httpOnly: true,
          secure: true, // Asegúrate de que tu aplicación esté sirviendo a través de HTTPS
          sameSite: "Strict", // Cambia esto según tus necesidades
          maxAge: constantes.TIEMPO_ACCESS_TOKEN * 1000, // 24 horas
        });
        return res.json({ accessToken });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.error("Error durante el login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function registrar(req, res) {
  try {
    const { login, password } = req.body;
    const usuarioRecuperado = await Usuario.registrar(login, password);
    if (!usuarioRecuperado) {
      return res
        .status(400)
        .json({ success: false, message: "User registration failed" });
    } else {
      return res.json({
        success: true,
        message: "Usuario registrado correctamente",
      });
    }
  } catch (error) {
    console.error("Error durante el registro:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
