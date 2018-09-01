import * as React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import App from "./App";
import FirstComponent from "./components/FirstComponent";
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
                    <Route path="/FirstComponent" component={FirstComponent} />
                    <Redirect from="*" to="/FirstComponent" />
                </main>
            </div>
        </BrowserRouter>
    );
};
