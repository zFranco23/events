import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";



export const globalReducer = combineReducers({
    ui : uiReducer,
    calendar : calendarReducer,
    auth : authReducer
    //Add more reducers
})