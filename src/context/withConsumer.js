import React, { Component } from "react";
import { WeatherContext } from "./weather-context";

const withConsumer = BaseComponent => {
    return class extends Component {
        static displayName = `WithConsumer${BaseComponent.name}`;

        // makes use of render props
        render() {
            return (
                <WeatherContext.Consumer>
                    {context => {
                        return <BaseComponent {...context} {...this.props} {...this.state} />;
                    }}
                </WeatherContext.Consumer>
            );
        }
    };
};

export default withConsumer;
