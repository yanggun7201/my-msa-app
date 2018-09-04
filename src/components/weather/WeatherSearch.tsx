import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Search from "@material-ui/icons/Search";
import * as React from "react";
import { WeatherContext } from "../../context/weather-context";
import { isMobile } from "../../utils/utils";

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
                                    key={context.city ? context.city : Math.random()}
                                    className="msa-input"
                                    id="input-with-icon-adornment"
                                    onKeyUp={context.fetchWeather}
                                    placeholder="Input City"
                                    defaultValue={context.city}
                                    autoFocus={!isMobile()}
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
