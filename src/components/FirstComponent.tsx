import * as React from "react";
import { IAppContextInterface, WeatherContext } from "../context/weather-context";
import WeatherList from "./weather/WeatherList";
import WeatherSearch from "./weather/WeatherSearch";
import WeatherSearchError from "./weather/WeatherSearchError";

const API_KEY = "0b172c5c1180e2908722fcf6dc2b3a03";

export default class FirstComponent extends React.Component<{}, IAppContextInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            fetchWeather: this.fetchWeather,
            errorMessage: undefined,
            weatherData: []
        };
    }

    public fetchWeather = (e: React.KeyboardEvent<HTMLInputElement>): React.KeyboardEvent<HTMLInputElement> => {
        if (e.keyCode !== 13) {
            return e;
        }

        const cityName = e.currentTarget.value;

        this.setState({
            errorMessage: undefined
        });

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`, {
            method: "GET"
        }).then((response: any) => {
            response.json().then((data: any) => {
                console.log(data);

                if (data.cod === "404") {
                    this.setState({
                        errorMessage: data.message
                    });
                    return;
                }

                console.log("현재온도 : " + (data.main.temp - 273.15));
                console.log("현재습도 : " + data.main.humidity);
                console.log("날씨 : " + data.weather[0].main);
                console.log("상세날씨설명 : " + data.weather[0].description);
                console.log("날씨 이미지 : " + data.weather[0].icon);
                console.log("바람   : " + data.wind.speed);
                console.log("나라   : " + data.sys.country);
                console.log("도시이름  : " + data.name);
                console.log("구름  : " + data.clouds.all + "%");

                const weatherData = this.state.weatherData || [];
                weatherData.push(data);
                this.setState({ weatherData });
            });

            return response;
        });

        console.log(e.currentTarget.value);
        return e;
    };

    public render() {
        return (
            <div className="container-fluid">
                <WeatherContext.Provider value={this.state}>
                    <WeatherSearchError />
                    <WeatherSearch />
                    <WeatherList data={this.state.weatherData} />
                </WeatherContext.Provider>
            </div>
        );
    }
}
