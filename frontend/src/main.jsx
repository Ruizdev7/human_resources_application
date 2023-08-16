import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux_app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

const persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
			<ToastContainer />
		</PersistGate>
	</Provider>

);