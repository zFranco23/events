import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../redux/actions/auth';
import { clearCalendar } from '../../redux/actions/calendar';

const Navbar = () => {

    const { name } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch( startLogout() );
        dispatch( clearCalendar() );
    } 
    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                { name }
            </span>

            <button className="btn btn-outline-danger" onClick = { handleLogout }>
                <i className="fas fa-sign-out-alt"></i>
                <span>  Salir</span>
            </button>
        </div>
    )
}

export default Navbar
