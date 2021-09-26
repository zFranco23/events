import React, { useEffect, useState } from 'react'
import { Calendar , momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'

import { messages } from '../../helpers/messages-es'
import Navbar from '../ui/Navbar'
import CalendarEvent from './CalendarEvent'

import 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('es')
const localizer = momentLocalizer(moment)

const events = [
    {
        title : 'First event',
        start : moment().toDate(),
        end : moment().add(2,'hours').toDate(),//añadir 2 horas
        bgColor : '#333333',
        user : {
            _id : '123',
            name : 'Franco'
        }
        /* allDay : true */
    },
    {
        title : 'Second event',
        start : moment().add(1,'days').toDate(),
        end : moment().add(2,'hours').toDate(),//añadir 2 horas
        bgColor : '#333333',
        notes : 'Notas que yo quisiera agregar',
        user : {
            _id : '456',
            name : 'Nicolai'
        }
        /* allDay : true  , ya no es necesario hora de inicio y de fin */
    },

]
const CalendarScreen = () => {

    const [ view , setView ] = useState(
        localStorage.getItem('lastView') || 'month'
    )
    //Se realiza por cada evento
    const evetStyleGetter = (event , start ,end ,isSelected) => {
        //Style a retornar
        const style = {
            backgroundColor : '#367CF7',
            borderRadius : '0px',
            opacity : 0.8,
            display : 'block',
            color : 'white'
        }
        return {
            style
        }
    }

    //Doble click para activar evento y el modal para editarlo
    const onDoubleClick = (e) => {
        console.log(e);
    }

    //Un click y activar evento , valido para eliminar
    const onSelectEvent = (e) => {
        console.log(e);
    }

    //Controlar cambio mes semana dia
    const onViewChange = (e) => {
        setView(e);
    }


    useEffect(() => {
        localStorage.setItem('lastView',view);
    },[view])

    
    return (
        <div className="calendar__screen">
            <Navbar />
            

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages = {messages}
                eventPropGetter = { evetStyleGetter }
                components= {{
                    event : CalendarEvent
                }}
                onDoubleClickEvent = { onDoubleClick}//Cuando se activa el evento
                onSelectEvent= { onSelectEvent}
                onView= { onViewChange}
                view={ view }
            />
        </div>
    )
}

export default CalendarScreen
