import { CircularProgress } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import dateformat from "dateformat";
import * as React from "react";
import { WeatherContext } from "../../context/weather-context";
import { weacherIcons } from "./weather-icons";

interface IProps {
    data: any;
}
interface IState {
    fetching: boolean;
}

class WeatherItem extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false
        };
    }

    public componentWillReceiveProps = newProps => {
        console.log("componentWillReceiveProps", newProps);

        if (this.props.data) {
            if (this.props.data.fetchedAt !== newProps.fetchedAt) {
                this.setState({
                    fetching: false
                });
            }
        }
    };

    public renderIcon = data => {
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

    public renderTemporature = data => {
        const temporature = data.main.temp - 273.15;
        return temporature.toFixed(0) + " °C";
    };

    public renderCardBody = data => {
        return (
            <div className="row mb-1 mt-1">
                <div className="col-7 weather-icon">{this.renderIcon(data)}</div>
                <div className="col-5 text-right-display-inherit">
                    <div className="row">{this.renderTemporature(data)}</div>
                    <div className="row">{data.weather[0].main}</div>
                    <div className="row">
                        <i>
                            {data.name},{data.sys.country}
                        </i>
                    </div>
                </div>
            </div>
        );
    };

    public render() {
        if (!this.props.data) {
            return null;
        }

        const data = this.props.data;
        const fetching = this.state.fetching;

        return (
            <WeatherContext.Consumer>
                {context => {
                    const deleteWeather = () => {
                        if (context) {
                            context.deleteWeather(data);
                        }
                    };
                    const reloadWeather = () => {
                        if (context) {
                            this.setState({
                                fetching: true
                            });
                            context.reloadWeather(data);
                        }
                    };

                    return (
                        context && (
                            <div className="card border-dark mb-3">
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
                                    <React.Fragment>
                                        <div className="card-header">
                                            <h3 className="card-header-title">{data.name}</h3>
                                            <div className="card-header-right-side">
                                                <div className="save-button">
                                                    <RotateRightIcon onClick={reloadWeather} />
                                                    <DeleteForeverIcon onClick={deleteWeather} />
                                                </div>
                                                <div className="fetched-time">
                                                    fetched {dateformat(data.fetchedAt, "yyyy-mm-dd HH:MM:ss")}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">{this.renderCardBody(data)}</div>
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
                                    </React.Fragment>
                                )}
                            </div>
                        )
                    );
                }}
            </WeatherContext.Consumer>
        );
    }
}

export default WeatherItem;
