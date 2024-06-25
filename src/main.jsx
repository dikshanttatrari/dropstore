import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router-dom";
import router from "./routes/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter router={router} />
);
