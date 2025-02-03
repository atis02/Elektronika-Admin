import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Components/db/Redux/api/store.js";
import { ThemeProviderWrapper } from "./Components/db/Theme/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProviderWrapper>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProviderWrapper>
);
