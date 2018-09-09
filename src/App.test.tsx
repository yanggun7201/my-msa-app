import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { ThemeContext } from "./context/theme-context";
import withConsumer from "./context/withConsumer";
const WithConsumerApp = withConsumer(App, ThemeContext);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<WithConsumerApp />, div);
    ReactDOM.unmountComponentAtNode(div);
});
