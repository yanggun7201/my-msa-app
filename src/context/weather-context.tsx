import * as React from "react";

export interface IAppContextInterface {
    fetchWeather: any;
    errorMessage?: string;
    weatherData?: any[];
}

export const WeatherContext = React.createContext<IAppContextInterface | null>({
    fetchWeather: () => {
        console.log("context default");
    }
});
