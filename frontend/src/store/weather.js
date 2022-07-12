const API_KEY = process.env.REACT_APP_RAPID_API_KEY
// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const HYDRATE_WEATHER = 'weather/HYDRATE'

export const getWeather = () => async (dispatch) => {

    const zipCode = 21111;
    const numDays = 3;

    // limit the number of forecast days to 2
    // console.log(API_KEY)
    // const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${zipCode}&days=${numDays}`)
    //     .catch(err => console.error(err));


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${zipCode}&days=${numDays}`, options)
        .catch(err => console.error(err));

    if (response.ok) {
        const weather = await response.json();
        // for some reason the API returns today in the forecase list
        weather.forecast.forecastday = weather.forecast.forecastday.slice(1);
        dispatch(hydrateWeather(weather));
        return weather;
    }
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