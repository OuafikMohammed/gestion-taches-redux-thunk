import { legacy_createStore ,combineReducers, applyMiddleware } from "redux";
import tachesReducer from "./Actions/reducerAction";
import {thunk} from "redux-thunk";

// const store = legacy_createStore(tachesReducer);
const reducers = combineReducers({
    tachesReducer : tachesReducer
})
const store = legacy_createStore(reducers ,applyMiddleware(thunk));
export default store;