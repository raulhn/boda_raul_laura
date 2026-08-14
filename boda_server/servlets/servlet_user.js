import * as Usuario from "../logica/user.js";

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
        return res.json({ accessToken });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
