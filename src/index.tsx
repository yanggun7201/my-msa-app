import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { AppRouter } from "./router";

// import * as dotenv from "dotenv";

// const result = dotenv.config();

// if (result.error) {
//     throw result.error;
// }

// console.log(result.parsed);

console.log("process.env", process.env);
console.log("process.env.API_KEY", process.env.REACT_APP_API_KEY);

ReactDOM.render(<AppRouter />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
