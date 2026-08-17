import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Retos from "./components/componentesRetos/Retos.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import ComponenteLogin from "./components/componenteLogin/ComponenteLogin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/login"} element={<ComponenteLogin />} />
        <Route path={"/reto"} element={<Retos />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
