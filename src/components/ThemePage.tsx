import * as React from "react";
import { IThemeContextInterface, themes } from "../context/theme-context";

class ThemePage extends React.Component<IThemeContextInterface> {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div>
                <h2 className="theme-page-title">Change your theme!</h2>
                <div className="row">
                    {themes.map(theme => {
                        return (
                            <div
                                key={theme}
                                className="col-md-4 theme-title-area"
                                onClick={() => this.props.changeTheme(theme)}
                            >
                                <div className={`p-3 mb-3 theme-title btn swatch-${theme}`}>{theme}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default ThemePage;
