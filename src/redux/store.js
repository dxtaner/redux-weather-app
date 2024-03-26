// src/redux/store.js
import { createStore, combineReducers } from "redux";
import weatherReducer from "./reducers/weatherReducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
});

const store = createStore(rootReducer);

export default store;
