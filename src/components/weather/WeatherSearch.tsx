import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import Search from "@material-ui/icons/Search";
import * as React from "react";
import { WeatherContext } from "../../context/weather-context";

class WeatherSearch extends React.Component<{}> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    public render() {
        return (
            <WeatherContext.Consumer>
                {context =>
                    context && (
                        <div className="centreText">
                            <FormControl className="msa-form-control">
                                <InputLabel htmlFor="input-with-icon-adornment" className="msa-input-label">
                                    Weather in your city
                                </InputLabel>
                                <Input
                                    className="msa-input"
                                    id="input-with-icon-adornment"
                                    onKeyUp={context.fetchWeather}
                                    startAdornment={
                                        <InputAdornment
                                            position="start"
                                            classes={{
                                                root: "msa-input-adornment"
                                            }}
                                        >
                                            <Search
                                                classes={{
                                                    root: "msa-input-adornment-search"
                                                }}
                                            />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                    )
                }
            </WeatherContext.Consumer>
        );
    }
}

export default WeatherSearch;
