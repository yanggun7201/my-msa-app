// import { Card, CardContent } from "@material-ui/core";
import * as React from "react";
import { WeatherContext } from "../../context/weather-context";
import { weacherIcons } from "./weather-icons";

interface IProps {
    data: any;
}

class WeatherItem extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    public renderIcon = () => {
        const data = this.props.data;
        const prefix = "wi wi-";
        const code = data.weather[0].id;
        let icon = weacherIcons[code].icon;

        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = "day-" + icon;
        }
        icon = prefix + icon;
        // return <img src={`http://openweathermap.org/img/w/${icon}.png`} />;
        return <i className={icon} />;
    };

    public isFloat = n => {
        return Number(n) === n && n % 1 !== 0;
    };

    public renderTemporature = () => {
        const data = this.props.data;
        const temporature = data.main.temp - 273.15;
        return temporature.toFixed(0) + " °C";
    };

    public render() {
        if (!this.props.data) {
            return null;
        }

        const data = this.props.data;

        return (
            <WeatherContext.Consumer>
                {context =>
                    context && (
                        <div className="card border-dark mb-3">
                            <div className="card-header">
                                <h3 className="card-header-title">{data.name}</h3>
                            </div>
                            <div className="card-body">
                                <div className="row mb-1 mt-1">
                                    <div className="col-7 weather-icon">{this.renderIcon()}</div>
                                    <div className="col-5 text-right-display-inherit">
                                        <div className="row">{this.renderTemporature()}</div>
                                        <div className="row">{data.weather[0].main}</div>
                                        <div className="row">
                                            <i>
                                                {data.name},{data.sys.country}
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="row text-center">
                                    <div className="col-4">
                                        <i className="wi wi-strong-wind" />
                                        <br />
                                        <span>
                                            {data.wind.speed}
                                            &nbsp;m/s
                                        </span>
                                    </div>
                                    <div className="col-4">
                                        <i className="wi wi-raindrop" />
                                        <br />
                                        <span>
                                            {data.main.humidity}
                                            &nbsp;%
                                        </span>
                                    </div>
                                    <div className="col-4">
                                        <i className="wi wi-cloud" />
                                        <br />
                                        <span>
                                            {data.clouds.all}
                                            &nbsp;%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </WeatherContext.Consumer>
        );
    }
}

export default WeatherItem;
