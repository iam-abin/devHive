import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<React.StrictMode>
			<Provider store={store}>
			<App />
			</Provider>
		</React.StrictMode>
	</BrowserRouter>
);
