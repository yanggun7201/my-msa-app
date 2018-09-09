const WEATHER_STORAGE_KEY = "weatherData";
const THEME_STORAGE_KEY = "currentTheme";
export const DEFAULT_THEME = "purple";

export const loadWeather = (): any[] => {
    const weatherDataFromStorage = localStorage.getItem(WEATHER_STORAGE_KEY);
    return weatherDataFromStorage ? JSON.parse(weatherDataFromStorage) : [];
};

export const saveWeather = (wheatherData: any[]) => {
    localStorage.setItem(WEATHER_STORAGE_KEY, JSON.stringify(wheatherData));
};

export const loadTheme = (): string => {
    const currentTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (!currentTheme) {
        return DEFAULT_THEME;
    }

    return currentTheme;
};

export const saveTheme = (theme: string) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
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
