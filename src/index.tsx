import * as React from "react";
import * as ReactDOM from "react-dom";
import "./App.css";
import "./css/swatch.css";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { AppRouter } from "./router";

ReactDOM.render(<AppRouter />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
