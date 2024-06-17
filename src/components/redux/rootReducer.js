import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice.js";
const rootReducer = combineReducers({
    user: counterReducer,
});

export default rootReducer;