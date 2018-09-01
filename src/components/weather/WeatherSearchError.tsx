import * as React from "react";
import { Alert } from "react-bootstrap";
import { WeatherContext } from "../../context/weather-context";

class WeatherSearchError extends React.Component<{}> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    public render() {
        return (
            <WeatherContext.Consumer>
                {context =>
                    context &&
                    (context.errorMessage ? (
                        <Alert bsStyle="danger">
                            <strong>{context.errorMessage}</strong>
                        </Alert>
                    ) : (
                        <span />
                    ))
                }
            </WeatherContext.Consumer>
        );
    }
}

export default WeatherSearchError;
