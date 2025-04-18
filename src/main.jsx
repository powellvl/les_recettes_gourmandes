import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root";
import App from "./App.jsx";
import "./index.css";
import "./index.scss";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
