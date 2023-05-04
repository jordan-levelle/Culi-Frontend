import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import { MantineProvider } from "@mantine/core";
import themeObject from "./config/mantine";



ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<MantineProvider theme={themeObject} withGlobalStyles withNormalizeCSS>
					<App />
				</MantineProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
