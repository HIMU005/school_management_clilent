import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import "./index.css";
import AuthProvider from "./provider/AuthProvider.jsx";
import HomeRoute from "./routes/HomeRoute.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <HomeRoute />
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);
