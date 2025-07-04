import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Usercontext from "./context/Usercontext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Usercontext>
      <App />
    </Usercontext>
  </BrowserRouter>
);
