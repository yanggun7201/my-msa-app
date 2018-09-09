import * as React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import App from "./App";
import { Header } from "./components/Header";
import "./css/styles.css";
import "./css/weather-icons-wind.min.css";
import "./css/weather-icons.min.css";

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <main>
                    <Route exact={true} path="/" component={App} />
                    <Redirect from="*" to="/" />
                </main>
            </div>
        </BrowserRouter>
    );
};
