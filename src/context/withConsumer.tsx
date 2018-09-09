import * as React from "react";
import { WeatherContext } from "./weather-context";

const withConsumer = (BaseComponent: any, Context: React.Context<any> = WeatherContext) => {
    return class extends React.Component<any, any> {
        public static displayName: string = `WithConsumer${BaseComponent.name}`;

        public render() {
            return (
                <Context.Consumer>
                    {context => {
                        return <BaseComponent {...context} {...this.props} {...this.state} />;
                    }}
                </Context.Consumer>
            );
        }
    };
};

export default withConsumer;
