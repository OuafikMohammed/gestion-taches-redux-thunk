import { combineReducers } from "redux";
import tachesReducer from "./Actions/reducerAction";
import {thunk} from "redux-thunk";

// const store = legacy_createStore(tachesReducer);
const reducers = combineReducers({
    tachesReducer : tachesReducer
})
import { legacy_createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;
const store = legacy_createStore(reducers /* preloadedState, */, composeEnhancers(
    applyMiddleware(thunk)
  ));

export default store;