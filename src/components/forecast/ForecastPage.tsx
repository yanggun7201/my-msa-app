import { CircularProgress } from "@material-ui/core";
import dateformat from "dateformat";
import isEmpty from "lodash/isEmpty";
import * as React from "react";
import { getWeatherIcon, loadWeather } from "../../utils/utils";
import ForecastItem from "./ForecastItem";

interface IProps {
    theme: string;
    match: {
        params: {
            cityName: string;
        };
    };
}

interface IState {
    forecastWeathers: any[];
    errorMessage?: string;
    fetching: boolean;
    weatherData: any;
}

class ForecastPage extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            forecastWeathers: [],
            errorMessage: undefined,
            fetching: true,
            weatherData: loadWeather().filter(data => {
                return data.name === props.match.params.cityName;
            })[0]
        };
    }

    public componentDidMount = () => {
        const cityName = this.props.match.params.cityName;
        console.log("cityName", cityName);
        this.callForecastAPI(cityName, this.parseForecastData);
    };

    public parseForecastData = (forrecastData: any) => {
        console.log("parseForecastData", forrecastData);

        const { list, city } = forrecastData;
        const forecastWeathers = list.map(data => {
            const newData: any = {};

            const splittedDate = data.dt_txt.split(" ");
            newData.date = dateformat(new Date(splittedDate[0]), "ddd, mmm dS, yyyy");
            newData.time = splittedDate[1].substr(0, 5);

            newData.dt_txt = data.dt_txt;
            newData.temp = (data.main.temp - 273.15).toFixed(0);
            newData.temp_min = (data.main.temp_min - 273.15).toFixed(0);
            newData.temp_max = (data.main.temp_max - 273.15).toFixed(0);
            newData.humidity = data.main.humidity;
            newData.code = data.weather[0].id;
            newData.weather = data.weather[0].main;
            newData.description = data.weather[0].description;
            newData.icon = data.weather[0].icon;
            newData.wind = data.wind.speed;
            newData.clouds = data.clouds.all;
            newData.country = city.country;
            newData.city = city.name;
            return newData;
        });

        console.log("==============", getWeatherIcon);
        console.log(forecastWeathers);

        this.setState({
            forecastWeathers,
            fetching: false
        });
    };

    public callForecastAPI = (cityName: string, callback: (data: any) => void) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}`, {
            method: "GET"
        }).then((response: any) => {
            console.log("response", response);
            response.json().then((data: any) => {
                console.log(data);
                if (data.cod !== "200") {
                    this.setState({
                        errorMessage: `[${cityName}] ${data.message}`,
                        fetching: false
                    });
                    return;
                }

                callback(data);
            });

            return response;
        });
    };

    public renderFiveDays = () => {
        let preDate: string = "";
        let isHeader: boolean = false;
        return this.state.forecastWeathers.map((data, index) => {
            isHeader = preDate !== data.date;
            preDate = data.date;

            return (
                <React.Fragment key={data.dt_txt}>
                    {isHeader && (
                        <div className="seven-day-fc-header">
                            <div className="date">
                                {data.date}
                                {index === 0 && <span>&nbsp;Today</span>}
                            </div>
                        </div>
                    )}
                    <div className="seven-day-fc">
                        <div className="date">{data.time}</div>
                        <div className="weather-icon">{getWeatherIcon(data.code)}</div>
                        <div className="seven-day-temp">
                            <div className="temp-high">
                                {data.temp_max}
                                &nbsp;°C
                            </div>
                            <div className="sky-condition">{data.description}</div>
                        </div>
                        <div className="seven-day-others">
                            <div className="wind">
                                <i className="wi wi-strong-wind" style={{ minWidth: "25px" }} />
                                &nbsp;
                                {data.wind}
                                m/s
                            </div>
                            <div className="humidity">
                                <i className="wi wi-raindrop" style={{ minWidth: "25px" }} />
                                &nbsp;
                                {data.humidity}
                                &nbsp;%
                            </div>
                            <div className="clouds">
                                <i className="wi wi-cloud" style={{ minWidth: "25px" }} />
                                &nbsp;
                                {data.clouds}
                                &nbsp;%
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        });
    };

    public renderWeatherHourlyForecast = () => {
        if (isEmpty(this.state.forecastWeathers)) {
            return null;
        }

        const { city, country } = this.state.forecastWeathers[0];

        return (
            <React.Fragment>
                <div className="weather-hourly-forecast">
                    <h2 className="title">
                        Hourly weather and forecasts in {city}, {country}
                    </h2>
                </div>
                <div className="seven-day">{this.renderFiveDays()}</div>
            </React.Fragment>
        );
    };

    public render() {
        const { fetching } = this.state;

        return (
            <div className="weather-forecast" role="main">
                <ForecastItem data={this.state.weatherData} />
                {fetching ? (
                    <CircularProgress
                        classes={{
                            root: "card-reload"
                        }}
                        thickness={3}
                        size={90}
                        color="secondary"
                    />
                ) : (
                    <React.Fragment>{this.renderWeatherHourlyForecast()}</React.Fragment>
                )}
            </div>
        );
    }
}

export default ForecastPage;
