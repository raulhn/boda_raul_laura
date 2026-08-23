import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Retos from "./components/componentesRetos/Retos.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComponenteLogin from "./components/componenteLogin/ComponenteLogin.jsx";
import ComponenteMesas from "./components/componenteMesas/ComponenteMesas.jsx";
import ComponenteRetos from "./components/componenteRetos/ComponenteRetos.jsx";
import ComponenteDashBoard from "./components/componenteDashBoard/ComponenteDashBoard.jsx";

import { URL_BASE } from "./constantes.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={URL_BASE + "/"} element={<App />} />
        <Route path={URL_BASE + "/login"} element={<ComponenteLogin />} />
        <Route path={URL_BASE + "/mesas"} element={<ComponenteMesas />} />
        <Route path={URL_BASE + "/retos"} element={<ComponenteRetos />} />
        <Route path={URL_BASE + "/reto"} element={<Retos />} />
        <Route
          path={URL_BASE + "/dashboard"}
          element={<ComponenteDashBoard />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
