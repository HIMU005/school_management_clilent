import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import "./index.css";
import Root from "./layout/Root.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Root />}>
        <Route index element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
