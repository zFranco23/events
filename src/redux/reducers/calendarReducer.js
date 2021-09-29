import moment from "moment";
import { types } from "../types";


const initialState = {
    events : [
        {
            id : new Date().getTime(),
            title : 'Release something',
            start : moment().toDate(),
            end : moment().add(2,'hours').toDate(),
            notes : 'Lanzamiento pe chato',
            user : {
                _id : '123',
                name : 'Franco'
            }
        },
        {
            id : new Date().getTime(),
            title : 'Go to sk8',
            start : moment().add(1,'days').toDate(),
            end : moment().add(1,'days').add(2,'hours').toDate(),//añadir 2 horas
            notes : 'Notas que yo quisiera agregar',
            user : {
                _id : '456',
                name : 'Nicolai'
            }
            /* allDay : true  , ya no es necesario hora de inicio y de fin */
        },  
    ] ,
    activeEvent : null,
    auxiliarEvent : {
        title : '',
        notes : '',
        start : moment().toDate(),
        end : moment().add('1',"hours").toDate(),
    },
}

export const calendarReducer = ( state = initialState , action) => {

    switch (action.type) {
        case types.eventSetActive:

            return {
                ...state,
                activeEvent : action.payload
            }
        case types.eventAddNew :
            return {
                ...state,
                events : [...state.events,action.payload]
            }
        case types.eventClearActiveEvent :
            return {
                ...state,
                activeEvent : null,
            }
        case types.eventUpdated : 
            return {
                ...state,
                events : state.events.map ( e => ( e.id===action.payload.id ? action.payload : e ))
            }

        case types.eventDeleted : 
            return {
                ...state,
                events : state.events.filter( e => e.id!== state.activeEvent.id),
                activeEvent : null,
            }
        // case types.eventSetAuxiliar:
        //     return {
        //         ...state,
        //         auxiliarEvent : action.payload
        //     }
        default:
            return state;
    }

}