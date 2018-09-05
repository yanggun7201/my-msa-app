import dateformat from "dateformat";
import isEmpty from "lodash/isEmpty";
import * as React from "react";
import { WeatherContext } from "../../context/weather-context";
import withConsumer from "../../context/withConsumer";
import WeatherItem from "./WeatherItem";

const WithConsumerWeatherItem = withConsumer(WeatherItem);
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
            return <WithConsumerWeatherItem key={dateformat(item.fetchedAt, "yyyy-mm-dd HH:MM:ss.l")} data={item} />;
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
