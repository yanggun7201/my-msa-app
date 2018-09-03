import * as React from "react";

export interface IAppContextInterface {
    fetchWeather: any;
    errorMessage?: string;
    weatherData?: any[];
    city?: string;
    fetching?: boolean;
    deleteWeather: any;
}

export const WeatherContext = React.createContext<IAppContextInterface | null>({
    fetchWeather: () => {
        console.log("context default");
    },
    deleteWeather: data => {
        console.log("context default");
    }
});
