import {
    combineReducers,
    createStore,
    compose,
    applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';
import addressBookReducer from './reducers/contact'

const rootReducer = combineReducers({
    contacts: addressBookReducer
})

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk)
));


export default store;
