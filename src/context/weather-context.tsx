import * as React from "react";

export interface IAppContextInterface {
    errorMessage?: string;
    weatherData?: any[];
    city?: string;
    fetching?: boolean;
    fetchWeather: any;
    deleteWeather: any;
    reloadWeather: any;
}

export const WeatherContext = React.createContext<IAppContextInterface | null>({
    fetchWeather: () => {
        console.log("context default");
    },
    deleteWeather: data => {
        console.log("context default");
    },
    reloadWeather: data => {
        console.log("context default");
    }
});
