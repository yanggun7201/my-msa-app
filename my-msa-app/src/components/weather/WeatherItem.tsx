import { CircularProgress } from "@material-ui/core";
import { Typography } from "@material-ui/core/";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import classnames from "classnames";
import dateformat from "dateformat";
import * as React from "react";
import { Link } from "react-router-dom";
import { getWeatherIcon, isMobile } from "../../utils/utils";

interface IProps {
    data: any;
    deleteWeather: (data: any) => void;
    reloadWeather: (cityName: string) => void;
    registerWeatherForReload: (cityName: string, timeoutFunc: () => any) => void;
}
interface IState {
    fetching: boolean;
}

const RELOAD_MILLISECONDS =
    (process.env.REACT_APP_RELOAD_MINUTES //
        ? parseInt(process.env.REACT_APP_RELOAD_MINUTES, 10) //
        : 10) * //
    60 *
    1000;

class WeatherItem extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false
        };

        this.registerWeatherForReload();
    }

    public componentWillReceiveProps = newProps => {
        console.log("componentWillReceiveProps", newProps);

        if (this.props.data) {
            if (this.props.data.fetchedAt !== newProps.data.fetchedAt) {
                console.log("Changed Props", newProps);
                this.setState({
                    fetching: false
                });
            }
        }
    };

    public deleteWeather = () => {
        this.props.deleteWeather(this.props.data);
    };

    public reloadWeather = () => {
        this.setState({
            fetching: true
        });
        this.props.reloadWeather(this.props.data.name);
    };

    public registerWeatherForReload = () => {
        const { data } = this.props;
        const timeoutFunc: any = setTimeout(() => {
            console.log("setTimeout", new Date(), data.name);
            this.reloadWeather();
        }, RELOAD_MILLISECONDS);

        this.props.registerWeatherForReload(data.name, timeoutFunc);
    };

    public renderTemporature = data => {
        const temporature = data.main.temp - 273.15;
        return temporature.toFixed(1) + " °C";
    };

    public renderCardHeader = data => {
        return (
            <div className="card-header">
                <h3 className="card-header-title">{data.name}</h3>
                <div className="card-header-right-side">
                    <div className={classnames("save-button", { "is-mobile": isMobile() })}>
                        <Typography variant="display2" color="inherit">
                            <Link to={`/forecast/${data.name}`}>5 days</Link>
                        </Typography>

                        <RotateRightIcon onClick={this.reloadWeather} />
                        <DeleteForeverIcon onClick={this.deleteWeather} />
                    </div>
                    <div className="fetched-time">fetched {dateformat(data.fetchedAt, "yyyy-mm-dd HH:MM:ss")}</div>
                </div>
            </div>
        );
    };

    public renderCardBody = data => {
        return (
            <div className="card-body">
                <div className="row mb-1 mt-1">
                    <div className="col-6 weather-icon">{getWeatherIcon(data.weather[0].id)}</div>
                    <div className="col-6 text-right-display-inherit">
                        <div className="row">{this.renderTemporature(data)}</div>
                        <div className="row">{data.weather[0].main}</div>
                        <div className="row">
                            <i>
                                {data.name},{data.sys.country}
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    public renderCardFooter = data => {
        return (
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
        );
    };

    public render() {
        if (!this.props.data) {
            return null;
        }

        const data = this.props.data;
        const fetching = this.state.fetching;

        return (
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
                        {this.renderCardHeader(data)}
                        {this.renderCardBody(data)}
                        {this.renderCardFooter(data)}
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default WeatherItem;
