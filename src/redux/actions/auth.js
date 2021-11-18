
import Swal from "sweetalert2";
import { requestAPI } from "../../axios/axios.config";
import { types } from "../types";




export const startLogin = ( values ) => {
    return async ( dispatch ) => {

        try{

            const resp = await requestAPI('/auth',values, {} , 'POST');
            
            if(resp?.ok){
                localStorage.setItem('CalendarToken' , resp.token );
                localStorage.setItem('CalendarTokenInitDate' , new Date().getTime() );
    
                dispatch(login( { uid : resp.uid , name : resp.name }))
            }
        }catch( err ){

            const { response } = err;
            const { data } = response;
            Swal.fire('Error', data.mssg , 'error')
        }
    }
}

export const startRegister = ( values ) => {
    return async ( dispatch ) => {

        try{

            const resp = await requestAPI('/auth/new',values, {} , 'POST');
            
            if(resp?.ok){
                localStorage.setItem('CalendarToken' , resp.token );
                localStorage.setItem('CalendarTokenInitDate' , new Date().getTime() );
    
                dispatch(login( { uid : resp.uid , name : resp.name }))
            }
        }catch(err){
            const { response } = err;
            const { data  } = response;
            Swal.fire('Error', data.mssg , 'error')
        }
    }
}

export const startChecking = ( values ) => {
    return async ( dispatch ) => {
        try{

            const token = localStorage.getItem('CalendarToken') || '';
            const resp = await requestAPI('/auth/renew',values, { 'x-token' : token } , 'GET');
            
            if(resp?.ok){
                localStorage.setItem('CalendarToken' , resp.token );
                localStorage.setItem('CalendarTokenInitDate' , new Date().getTime() );
    
                dispatch(login( { uid : resp.uid , name : resp.name }))
            }
            
        }catch(err){
            dispatch( finishChecking())
        }
    }
}

export const finishChecking = () => ({ type : types.authLoadingFinish})
export const startLogout = () => {
    return (dispatch) => {

        localStorage.removeItem('CalendarToken');
        localStorage.removeItem('CalendarTokenInitDate');

        dispatch( logout());
    }
}

//Sincrono
export const login = ( user ) => ({
    type : types.authLogin,
    payload : user
})

export const logout = () => ({ type : types.authLogout})