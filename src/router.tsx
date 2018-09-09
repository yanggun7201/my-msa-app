import * as React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import App from "./App";
import { Header } from "./components/Header";
import ThemePage from "./components/ThemePage";
import { ThemeConsumer, ThemeContext, ThemeProvider } from "./context/theme-context";
import withConsumer from "./context/withConsumer";
import "./css/styles.css";
import "./css/weather-icons-wind.min.css";
import "./css/weather-icons.min.css";

const WithConsumerThemePage = withConsumer(ThemePage, ThemeContext);

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (
        <ThemeProvider>
            <ThemeConsumer>
                {context => {
                    const theme = context.theme;
                    return (
                        <BrowserRouter>
                            <div id="theme-root" className={`theme-${theme}`}>
                                <Header />
                                <main>
                                    <Route exact={true} path="/" component={App} />
                                    <Route exact={true} path="/theme" component={WithConsumerThemePage} />
                                    <Redirect from="*" to="/" />
                                </main>
                            </div>
                        </BrowserRouter>
                    );
                }}
            </ThemeConsumer>
        </ThemeProvider>
    );
};
