import React from "react";
import ReactDOM from "react-dom/client";

import { Home } from "./pages/home/home";

function App() {
  return <Home />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
