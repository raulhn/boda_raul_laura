import * as Usuario from "../logica/user.js";
import * as constantes from "../constantes.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  try {
    console.log("Login attempt received.");
    console.log("Body", req.body)
    console.log("Attempting login for user:", req.body.usuario);

    const { usuario, password } = req.body;
    console.log("--- START LOGIN PROCESS ---");
    const usuarioRecuperado = await Usuario.obtenerUsuario(usuario, password);
    console.log("User found in DB:", usuarioRecuperado, "Length:", usuarioRecuperado.length);

    if (!usuarioRecuperado) {
      console.log("Login failed: User not found.");
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });
    } else if (usuarioRecuperado.length === 0) {
      console.log("Login failed: User not found (empty array).");
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });
    } else {
      if (
        await Usuario.comparar_passwords(
          password,
          usuarioRecuperado[0].password,
        )
      ) {
        console.log("Login successful for user:", usuario);
        const user = { name: usuario };
        // Logging the attempt to use TOKENAUTH
        console.log("Attempting to sign token for user:", usuario);
        const accessToken = jwt.sign(user, process.env.TOKENAUTH);

        res.cookie(constantes.ACCESS_TOKEN, accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
          maxAge: constantes.TIEMPO_ACCESS_TOKEN * 1000,
        });
        console.log("Token signed and sent successfully.");
        return res.status(200).send({ success: true, token: accessToken });
      } else {
        console.log("Password mismatch for user:", usuario);
        return res
          .status(401)
          .send({ success: false, message: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.error("!!! CRITICAL ERROR DURING LOGIN !!!", error.message, "Stack:", error.stack);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
}

export async function registrar(req, res) {
  try {
    const { login, password } = req.body;
    const usuarioRecuperado = await Usuario.registrar(login, password);
    if (!usuarioRecuperado) {
      return res
        .status(400)
        .send({ success: false, message: "User registration failed" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Usuario registrado correctamente",
      });
    }
  } catch (error) {
    console.error("Error durante el registro:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
}
