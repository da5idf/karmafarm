import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import userReducer from './users';
import restaurantReducer from './restaurants';
import productReducer from './products';
import orderReducer from './orders';
import feedbackReducer from './feedback';

const rootReducer = combineReducers({
    session: sessionReducer,
    users: userReducer,
    restaurants: restaurantReducer,
    products: productReducer,
    orders: orderReducer,
    feedback: feedbackReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;