import * as React from "react";

export interface IAppContextInterface {
    errorMessage?: string;
    weatherData?: any[];
    city?: string;
    fetching?: boolean;
    fetchWeather: any;
    deleteWeather: (data: any) => void;
    reloadWeather: (cityName: string) => void;
    registerWeatherForReload: (cityName: string, timeoutFunc: () => any) => void;
    weatherTimeouts: [];
}

export const WeatherContext = React.createContext<IAppContextInterface | null>({
    fetchWeather: () => {
        console.log("context default");
    },
    deleteWeather: data => {
        console.log("context default");
    },
    reloadWeather: (cityName: string) => {
        console.log("context default");
    },
    registerWeatherForReload: (cityName: string, timeoutFunc: () => any) => {
        console.log("context default");
    },
    weatherTimeouts: []
});
