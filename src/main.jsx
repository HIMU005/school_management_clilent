import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import "./index.css";
import AuthProvider from "./provider/AuthProvider.jsx";
import HomeRoute from "./routes/HomeRoute.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <HomeRoute />
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);
