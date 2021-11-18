import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDeleted, eventStartDeleting } from '../../redux/actions/calendar';

const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const handleDeleteEvent = () => {
        dispatch( eventStartDeleting());
    }
    return (
        <button
            className="btn btn-danger fab-trash"
            onClick= { handleDeleteEvent }
        >
            <i className="fas fa-trash" />
            <span> Borrar evento</span>
        </button>
    )
}

export default DeleteEventFab
