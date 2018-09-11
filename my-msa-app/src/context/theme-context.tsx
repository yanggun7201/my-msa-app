import * as React from "react";
import { DEFAULT_THEME, loadTheme, saveTheme } from "../utils/utils";
export const themes = ["blue", "indigo", "purple", "pink", "red", "orange", "green", "teal", "cyan"];

export interface IThemeContextInterface {
    theme: string;
    changeTheme: (theme: string) => void;
}
export interface IThemeProps {
    children: any;
}

export const ThemeContext = React.createContext<IThemeContextInterface>({
    theme: DEFAULT_THEME,
    changeTheme: (theme: string) => {
        console.log("changeTheme", theme);
    }
});

export class ThemeProvider extends React.Component<IThemeProps, IThemeContextInterface> {
    constructor(props) {
        super(props);
        this.state = {
            theme: loadTheme(),
            changeTheme: this.changeTheme
        };
    }

    public changeTheme = (theme: string) => {
        saveTheme(theme);
        this.setState({
            theme
        });
    };

    public render() {
        return <ThemeContext.Provider value={this.state}>{this.props.children}</ThemeContext.Provider>;
    }
}

export const ThemeConsumer = ThemeContext.Consumer;
