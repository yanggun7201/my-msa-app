import { CircularProgress, Dialog } from "@material-ui/core";
import * as React from "react";
import { IAppContextInterface, WeatherContext } from "../context/weather-context";
import { loadWeather, saveWeather } from "../utils/utils";
import WeatherList from "./weather/WeatherList";
import WeatherSearch from "./weather/WeatherSearch";
import WeatherSearchError from "./weather/WeatherSearchError";

export default class FirstComponent extends React.Component<{}, IAppContextInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            fetchWeather: this.fetchWeather,
            deleteWeather: this.deleteWeather,
            reloadWeather: this.reloadWeather,
            registerWeatherForReload: this.registerWeatherForReload,
            errorMessage: undefined,
            weatherData: loadWeather(),
            city: "",
            fetching: true,
            weatherTimeouts: []
        };
    }

    public componentDidMount = () => {
        this.setState({
            fetching: false
        });
    };

    public registerWeatherForReload = (cityName: string, timeoutFunc: () => any) => {
        console.log("registerWeatherForReload", cityName);

        const weatherTimeouts = this.state.weatherTimeouts;
        if (weatherTimeouts[cityName]) {
            clearTimeout(weatherTimeouts[cityName]);
        }
        weatherTimeouts[cityName] = timeoutFunc;
    };

    public existsWeather = (cityName = "") => {
        if (this.state.weatherData) {
            return this.state.weatherData.some((weather: any) => {
                console.log("weather.name.toLowerCase()", weather.name.toLowerCase());
                console.log("cityName.toLowerCase()", cityName.toLowerCase());

                if (weather.name.toLowerCase() === cityName.toLowerCase()) {
                    return true;
                }
                return false;
            });
        }
        return false;
    };

    public findIndex = cityName => {
        if (this.state.weatherData) {
            return this.state.weatherData.findIndex((weather: any) => {
                if (weather.name === cityName) {
                    return true;
                }
                return false;
            });
        }
        return -1;
    };

    public deleteWeather = data => {
        if (this.state.weatherData) {
            const index = this.findIndex(data.name);

            const newWeatherData = [
                ...this.state.weatherData.slice(0, index),
                ...this.state.weatherData.slice(index + 1)
            ];

            this.setState({
                weatherData: newWeatherData
            });

            saveWeather(newWeatherData);
        }
    };

    public callWeatherAPI = (cityName: string, callback: (data: any) => void) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}`, {
            method: "GET"
        }).then((response: any) => {
            response.json().then((data: any) => {
                console.log(data);
                if (data.cod !== 200) {
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

    public reloadWeather = (cityName: string) => {
        this.callWeatherAPI(cityName, (data: any) => {
            const weatherData = this.state.weatherData || [];
            data.fetchedAt = new Date();
            const index = this.findIndex(data.name);

            const newWeatherData = [...weatherData.slice(0, index), data, ...weatherData.slice(index + 1)];

            this.setState({
                weatherData: newWeatherData,
                fetching: false
            });

            saveWeather(newWeatherData);
        });
    };

    public fetchWeather = (e: React.KeyboardEvent<HTMLInputElement>): React.KeyboardEvent<HTMLInputElement> => {
        if (e.keyCode !== 13) {
            return e;
        }

        const cityName = e.currentTarget.value;

        if (this.existsWeather(cityName)) {
            this.setState({
                errorMessage: `${cityName} is already in the weather list`,
                city: cityName,
                fetching: false
            });
            return e;
        }

        this.setState({
            errorMessage: undefined,
            city: "",
            fetching: true
        });

        this.callWeatherAPI(cityName, (data: any) => {
            // console.log("현재온도 : " + (data.main.temp - 273.15));
            // console.log("현재습도 : " + data.main.humidity);
            // console.log("날씨 : " + data.weather[0].main);
            // console.log("상세날씨설명 : " + data.weather[0].description);
            // console.log("날씨 이미지 : " + data.weather[0].icon);
            // console.log("바람   : " + data.wind.speed);
            // console.log("나라   : " + data.sys.country);
            // console.log("도시이름  : " + data.name);
            // console.log("구름  : " + data.clouds.all + "%");

            const weatherData = this.state.weatherData || [];
            data.fetchedAt = new Date();

            const newWeatherData = [data, ...weatherData];
            this.setState({
                weatherData: newWeatherData,
                fetching: false
            });

            saveWeather(newWeatherData);
        });

        console.log(e.currentTarget.value);
        return e;
    };

    public handleClose = () => {
        // this.props.onClose(this.props.selectedValue);
        console.log("handleClose");
    };

    public renderSpinner = () => {
        return (
            <Dialog
                open={true}
                onClose={this.handleClose}
                classes={{
                    root: "msa-dialog-spinner"
                }}
            >
                <CircularProgress
                    classes={{
                        root: "bbbb"
                    }}
                    thickness={3}
                    size={90}
                    color="secondary"
                />
            </Dialog>
        );
    };

    public render() {
        return (
            <div className="container-fluid">
                {this.state.fetching && this.renderSpinner()}
                <WeatherContext.Provider value={this.state}>
                    <WeatherSearchError />
                    <WeatherSearch />
                    <WeatherList data={this.state.weatherData} />
                </WeatherContext.Provider>
            </div>
        );
    }
}
