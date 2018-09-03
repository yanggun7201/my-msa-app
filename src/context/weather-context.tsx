import * as React from "react";

export interface IAppContextInterface {
    fetchWeather: any;
    errorMessage?: string;
    weatherData?: any[];
    city?: string;
    fetching?: boolean;
}

export const WeatherContext = React.createContext<IAppContextInterface | null>({
    fetchWeather: () => {
        console.log("context default");
    }
});
