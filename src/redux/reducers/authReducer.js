import { types } from "../types";



const initialState={
    loading : true,
    // uid : null,
    // name : null,
}

export const authReducer = ( state = initialState , action) => {

    switch (action.type) {
        case types.authLogin:
            const { uid , name } = action.payload;
            
            return {
                ...state,
                loading : false,
                uid,
                name
            }
        case types.authLoadingFinish : 
            return {
                ...state,
                loading : false
            }
        case types.authLogout:
            return {
                ...state,
                uid : null,
                name : null,
            }
        default:
            return state;
    }
}