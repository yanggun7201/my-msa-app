import { CircularProgress, Dialog } from "@material-ui/core";
import * as React from "react";
import { IAppContextInterface, WeatherContext } from "../context/weather-context";
import WeatherList from "./weather/WeatherList";
import WeatherSearch from "./weather/WeatherSearch";
import WeatherSearchError from "./weather/WeatherSearchError";

export default class FirstComponent extends React.Component<{}, IAppContextInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            fetchWeather: this.fetchWeather,
            errorMessage: undefined,
            weatherData: [],
            city: ""
        };
    }

    public fetchWeather = (e: React.KeyboardEvent<HTMLInputElement>): React.KeyboardEvent<HTMLInputElement> => {
        if (e.keyCode !== 13) {
            return e;
        }

        const cityName = e.currentTarget.value;

        this.setState({
            errorMessage: undefined,
            city: ""
        });

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}`, {
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

    public handleClose = () => {
        // this.props.onClose(this.props.selectedValue);
        console.log("handleClose");
    };

    public render() {
        return (
            <div className="container-fluid">
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
                <WeatherContext.Provider value={this.state}>
                    <WeatherSearchError />
                    <WeatherSearch />
                    <WeatherList data={this.state.weatherData} />
                </WeatherContext.Provider>
            </div>
        );
    }
}
