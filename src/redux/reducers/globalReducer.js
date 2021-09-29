import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";



export const globalReducer = combineReducers({
    ui : uiReducer,
    calendar : calendarReducer,
    //Add more reducers
})