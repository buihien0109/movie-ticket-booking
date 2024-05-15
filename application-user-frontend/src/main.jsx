import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import store from "./app/store";
import "./index.css";
import { WebSocketProvider } from "./contexts/WebSocketProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <Provider store={store}>

            <BrowserRouter>
                <WebSocketProvider>
                    <App />
                </WebSocketProvider>
            </BrowserRouter>
        </Provider>

    </React.StrictMode >
);
