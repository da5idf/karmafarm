const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const HYDRATE_WEATHER = 'weather/HYDRATE'

export const getWeather = () => async (dispatch) => {

    const zipCode = 21111;
    const numDays = 2;

    // limit the number of forecast days to 2
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${zipCode}&days=${numDays}`)


    if (response) {
        const weather = await response.json();
        console.log(weather);
        dispatch(hydrateWeather(weather));
        return weather;
    }

    return response.code; // ERROR HANDLING?
}

const hydrateWeather = (weather) => ({
    type: HYDRATE_WEATHER,
    weather
})

const initialState = {};

const weatherReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case HYDRATE_WEATHER:
            newState = action.weather;
            return newState;
        default:
            return state;
    }
}

export default weatherReducer;