import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { 
    // BrowserRouter as Router, 
    HashRouter as Router, 
    Switch,
    Redirect
} from 'react-router-dom'

import LoginScreen from '../components/auth/LoginScreen'
import CalendarScreen from '../components/calendar/CalendarScreen'
import LoaderComponent from '../components/ui/Loader';

import { startChecking } from '../redux/actions/auth'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const AppRouter = () => {

    const dispatch = useDispatch();
    const { uid, loading } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch ( startChecking());
    },[dispatch])

    if(loading){
        return <LoaderComponent />
    }

    return (
        <Router>
           <div>
               <Switch>
                   <PublicRoute exact path="/login" component ={LoginScreen} isAuthenticated = { !!uid } />
                   <PrivateRoute exact path="/" component ={CalendarScreen} isAuthenticated = { !!uid } />

                   <Redirect to="/" />
               </Switch>
           </div>
        </Router>
    )
}

export default AppRouter
