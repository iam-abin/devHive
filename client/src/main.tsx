// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
// import { ErrorBoundary } from "react-error-boundary";
// import Fallback from "./components/Error/ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		{/* <React.StrictMode> */}
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				{/* <ErrorBoundary FallbackComponent={Fallback}> */}
				<App />
				{/* </ErrorBoundary> */}
			</PersistGate>
		</Provider>
		{/* </React.StrictMode> */}
	</BrowserRouter>
);
