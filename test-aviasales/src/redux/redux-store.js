import {
    applyMiddleware, combineReducers, createStore,
} from 'redux';

import thunk from 'redux-thunk';
import ticketReducer from "./ticket-reducer";

const rootReducer = combineReducers({
    ticketsPage: ticketReducer
});

export default createStore(rootReducer, (applyMiddleware(thunk)));