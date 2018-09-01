import isEmpty from "lodash/isEmpty";
import * as React from "react";
import { WeatherContext } from "../../context/weather-context";
import WeatherItem from "./WeatherItem";

interface IProps {
    data: any[] | undefined;
}

class WeatherList extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    public renderWeatherItems = () => {
        if (!this.props.data) {
            return null;
        }

        return this.props.data.map((item, index) => {
            return <WeatherItem key={index} data={item} />;
        });
    };
    public render() {
        return (
            <WeatherContext.Consumer>
                {context =>
                    context &&
                    (!isEmpty(context.weatherData) ? (
                        <div className="card-columns card-deck">{this.renderWeatherItems()}</div>
                    ) : (
                        <div>No Weather Data</div>
                    ))
                }
            </WeatherContext.Consumer>
        );
    }
}

export default WeatherList;
