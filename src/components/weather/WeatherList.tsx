import dateformat from "dateformat";
import isEmpty from "lodash/isEmpty";
import * as React from "react";
import withConsumer from "../../context/withConsumer";
import WeatherItem from "./WeatherItem";

const WithConsumerWeatherItem = withConsumer(WeatherItem);
interface IProps {
    weatherData?: any[];
}

class WeatherList extends React.Component<IProps> {
    constructor(props) {
        super(props);
    }

    public renderWeatherItems = () => {
        const { weatherData } = this.props;

        if (!weatherData) {
            return null;
        }

        return weatherData.map((item, index) => {
            return <WithConsumerWeatherItem key={dateformat(item.fetchedAt, "yyyy-mm-dd HH:MM:ss.l")} data={item} />;
        });
    };

    public render() {
        if (isEmpty(this.props.weatherData)) {
            return <div>No Weather Data</div>;
        }

        return <div className="card-columns card-deck">{this.renderWeatherItems()}</div>;
    }
}

export default WeatherList;
