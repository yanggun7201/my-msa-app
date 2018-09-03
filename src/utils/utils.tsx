const STORAGE_KEY = "weatherData";

export const loadWeather = (): any[] => {
    const weatherDataFromStorage = localStorage.getItem(STORAGE_KEY);
    return weatherDataFromStorage ? JSON.parse(weatherDataFromStorage) : [];
};

export const saveWeather = (wheatherData: any[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wheatherData));
};

export const isMobile = () => {
    if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    } else {
        return false;
    }
};
