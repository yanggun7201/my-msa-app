const STORAGE_KEY = "weatherData";

export const loadWeather = (): any[] => {
    const weatherDataFromStorage = localStorage.getItem(STORAGE_KEY);
    return weatherDataFromStorage ? JSON.parse(weatherDataFromStorage) : [];
};

export const saveWeather = (wheatherData: any[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wheatherData));
};
