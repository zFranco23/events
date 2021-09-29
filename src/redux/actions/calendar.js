import { types } from "../types";




export const eventSetActive = (event) => ({
    type : types.eventSetActive,
    payload : event
})

export const eventAddNew = (event) => ({
    type : types.eventAddNew,
    payload : event
})

export const eventClearActiveEvent = () => ({
    type : types.eventClearActiveEvent
})

export const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload : event
})

export const eventDeleted = () => ({
    type: types.eventDeleted
})

export const eventSetAuxiliar = (event) => ({
    type : types.eventSetAuxiliar,
    payload : event
})