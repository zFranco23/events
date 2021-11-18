import Swal from "sweetalert2";
import { requestAPI } from "../../axios/axios.config";
import { prepareDataEvents } from "../../helpers/prepareData";
import { types } from "../types";




export const eventStartAddNew = (event) => {
    return async ( dispatch, getState ) => {
        const { uid , name } = getState().auth;
        try{
            const token = localStorage.getItem('CalendarToken') || '';
            const res = await requestAPI('/events', event , { 'x-token' : token }, 'POST');

            if(res?.ok){
                event.eid = res.event.eid;
                event.user = {
                    _id : uid,
                    name
                }
                // console.log(event);
                dispatch (eventAddNew(event));
                Swal.fire('Evento Agregado' , 'Evento agregado correctamente', 'success')
            }

        }catch(err){
            console.log(err);
            Swal.fire('Error', err.mssg , 'error')
        }
    }
}


export const eventStartLoading = () => {
    return async ( dispatch ) => {
        
        try{
            const token = localStorage.getItem('CalendarToken') || '';
            const res = await requestAPI('/events', null , { 'x-token' : token } , 'GET');

            if(res?.ok){
                const events = prepareDataEvents(res.events);
                dispatch(eventLoaded(events))
            }
        }catch(err){
            console.log(err);

        }
    }
}

export const eventStartUpdated = ( event ) => {
    return async (dispatch) => {
        try{
            const token = localStorage.getItem('CalendarToken') || '';
            const resp = await requestAPI(`/events/${event.eid}`, event ,{ 'x-token' : token } , 'PUT')

            if(resp?.ok){
                dispatch(eventUpdated(event));
                Swal.fire('Evento Actualizado' , 'Evento actualizado correctamente', 'success')
            }
        }catch(err){
            console.log(err);
        }
    }
}

export const eventStartDeleting = (event) => {
    return async (dispatch , getState) => {
        try{

            const { activeEvent : { eid }} = getState().calendar;
            const token = localStorage.getItem('CalendarToken') || '';
            const resp = await requestAPI(`/events/${eid}`, {} ,{ 'x-token' : token } , 'DELETE')

            if(resp?.ok){
                dispatch(eventDeleted());
                Swal.fire('Evento eliminado' , 'Evento eliminado correctamente', 'success')
            }
        }catch(err){
            console.log(err);
        }
    }
}

export const eventLoaded = ( events ) => ({
    type : types.eventLoaded,
    payload : events
})

export const eventSetActive = (event) => ({
    type : types.eventSetActive,
    payload : event
})

const eventAddNew = (event) => ({
    type : types.eventAddNew,
    payload : event
})

export const eventClearActiveEvent = () => ({
    type : types.eventClearActiveEvent
})

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload : event
})

const eventDeleted = () => ({
    type: types.eventDeleted
})

export const eventSetAuxiliar = (event) => ({
    type : types.eventSetAuxiliar,
    payload : event
})

export const clearCalendar = () => ({
    type : types.clearCalendar
})