import React, { useEffect, useState } from 'react'
import { Calendar , momentLocalizer} from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'

import { messages } from '../../helpers/messages-es'
import Navbar from '../ui/Navbar'
import CalendarEvent from './CalendarEvent'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import CalendarModal from './CalendarModal'
import { uiOpenModal } from '../../redux/actions/ui'
import { eventClearActiveEvent, eventSetActive, eventStartLoading} from '../../redux/actions/calendar'
import AddNewFab from '../ui/AddNewFab'
import DeleteEventFab from '../ui/DeleteEventFab'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('es')
const localizer = momentLocalizer(moment)

// const events = [
//     {
//         title : 'First event',
//         start : moment().toDate(),
//         end : moment().add(2,'hours').toDate(),//añadir 2 horas
//         bgColor : '#333333',
//         user : {
//             _id : '123',
//             name : 'Franco'
//         }
//         /* allDay : true */
//     },
//     {
//         title : 'Second event',
//         start : moment().add(1,'days').toDate(),
//         end : moment().add(2,'hours').toDate(),//añadir 2 horas
//         bgColor : '#333333',
//         notes : 'Notas que yo quisiera agregar',
//         user : {
//             _id : '456',
//             name : 'Nicolai'
//         }
//         /* allDay : true  , ya no es necesario hora de inicio y de fin */
//     },

// ]
const CalendarScreen = () => {
    
    const dispatch = useDispatch();
    const { uid  } = useSelector( state => state.auth);
    const { events , activeEvent } = useSelector(state => state.calendar);
    const [ view , setView ] = useState(
        localStorage.getItem('lastView') || 'month'
    )
    //Se realiza por cada evento
    const evetStyleGetter = (event , start ,end ,isSelected) => {
        //Style a retornar

        //Esto se ejecuta uno por uno
        const style = {
            backgroundColor : uid === event.user._id ?  '#367CF7' : '#465660',
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
        // console.log(e);
        dispatch( uiOpenModal())
    }

    //Un click y activar evento , valido para eliminar
    const onSelectEvent = (event) => {
        // console.log(e);
        dispatch( eventSetActive(event) );
    }

    //Controlar cambio mes semana dia
    const onViewChange = (e) => {
        setView(e);
    }

    const onSelectSlot = (e) => {
        
        dispatch ( eventClearActiveEvent() );

        if( e.action ==="doubleClick" ){
            // const { start , end } = e;

            // const startDate = moment(start);
            // console.log(startDate.toDate());
            // const endDate = moment(end).add('1','hours');
            
            // dispatch ( eventSetAuxiliar({
            //     title : 'Hola',
            //     notes : '',
            //     start : startDate.toDate(),
            //     end : endDate.toDate(),
            // }))
            // dispatch ( uiOpenModal() );
        }
    }


    useEffect(() => {
        dispatch( eventStartLoading());
    },[dispatch])

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
                onSelectSlot = { onSelectSlot }
                selectable = { true }
                onView= { onViewChange}
                view={ view }
            />

            { !!activeEvent && <DeleteEventFab />  }
            <AddNewFab />
            <CalendarModal />
        </div>
    )
}

export default CalendarScreen
