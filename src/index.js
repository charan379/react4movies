import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/react4movies.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store, { persistor } from "./utils/store/reduxStore/Store";
import { PersistGate } from "redux-persist/integration/react";
import ThemeContextProvider from "./utils/store/contextAPI/themeToggler/ThemeContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <React.StrictMode>
    <ThemeContextProvider>
      <CookiesProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </CookiesProvider>
    </ThemeContextProvider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
