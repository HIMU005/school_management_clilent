import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import HomeRoute from "./routes/HomeRoute.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HomeRoute />
  </BrowserRouter>
);
