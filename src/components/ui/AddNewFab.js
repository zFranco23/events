import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../redux/actions/ui';

const AddNewFab = () => {

    const dispatch = useDispatch();
    const handleNewEvent = () => {
        dispatch( uiOpenModal() )
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick= { handleNewEvent }
        >
            <i className="fas fa-plus" />
        </button>
    )
}

export default AddNewFab
