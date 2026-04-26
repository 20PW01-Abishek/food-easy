import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.jsx";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";
import { StateProvider } from "./context/StateProvider";

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </Router>,
);
