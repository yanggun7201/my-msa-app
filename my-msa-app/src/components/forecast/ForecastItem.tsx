import { Typography } from "@material-ui/core/";
import { ArrowBack } from "@material-ui/icons/";
import classnames from "classnames";
import dateformat from "dateformat";
import * as React from "react";
import { Link } from "react-router-dom";
import { getWeatherIcon, isMobile } from "../../utils/utils";

interface IProps {
    data: any;
}

class ForecastItem extends React.Component<IProps> {
    constructor(props) {
        super(props);
    }

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
                            <Link to="/">
                                <ArrowBack />
                                Weather List
                            </Link>
                        </Typography>
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

        return (
            <div className="card border-dark mb-3">
                <React.Fragment>
                    {this.renderCardHeader(data)}
                    {this.renderCardBody(data)}
                    {this.renderCardFooter(data)}
                </React.Fragment>
            </div>
        );
    }
}

export default ForecastItem;
