import * as React from "react";
import { Alert } from "react-bootstrap";

interface IProps {
    errorMessage?: string;
}

class WeatherSearchError extends React.Component<IProps> {
    constructor(props) {
        super(props);
    }

    public render() {
        const { errorMessage } = this.props;

        if (!errorMessage) {
            return null;
        }

        return (
            <Alert bsStyle="danger">
                <strong>{errorMessage}</strong>
            </Alert>
        );
    }
}

export default WeatherSearchError;
