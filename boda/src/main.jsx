import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Retos from "./components/componentesRetos/Retos.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import ComponenteLogin from "./components/componenteLogin/ComponenteLogin.jsx";
import { URL_BASE } from "./constantes.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={URL_BASE + "/"} element={<App />} />
        <Route path={URL_BASE + "/login"} element={<ComponenteLogin />} />
        <Route path={URL_BASE + "/reto"} element={<Retos />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
