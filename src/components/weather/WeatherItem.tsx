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

    public render() {
        if (!this.props.data) {
            return null;
        }

        return (
            <WeatherContext.Consumer>
                {context =>
                    context && (
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">
                                    With supporting text below as a natural lead-in to additional content.
                                    {this.renderIcon()}
                                </p>
                                <a href="#" className="btn btn-primary">
                                    Go somewhere
                                </a>
                            </div>
                        </div>
                    )
                }
            </WeatherContext.Consumer>
        );
    }
}

export default WeatherItem;
