import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Search from "@material-ui/icons/Search";
import * as React from "react";
import { isMobile } from "../../utils/utils";

interface IProps {
    city?: string;
    fetchWeather: (e: React.KeyboardEvent<HTMLInputElement>) => React.KeyboardEvent<HTMLInputElement>;
}

class WeatherSearch extends React.Component<IProps> {
    constructor(props) {
        super(props);
    }
    public render() {
        const { city, fetchWeather } = this.props;
        return (
            <div className="centreText">
                <FormControl className="msa-form-control">
                    <InputLabel htmlFor="input-with-icon-adornment" className="msa-input-label">
                        Weather in your city
                    </InputLabel>
                    <Input
                        key={city ? city : Math.random()}
                        className="msa-input"
                        id="input-with-icon-adornment"
                        onKeyUp={fetchWeather}
                        placeholder="Input City"
                        defaultValue={city}
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
        );
    }
}

export default WeatherSearch;
