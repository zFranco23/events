import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch} from 'react-redux';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../redux/actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../redux/actions/calendar';
// import { getInitialState } from '../../helpers/getInitialState';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

//El evento tiene que empezar en una hora fija
const now = moment().minutes(0).seconds(0).add(1,'hours'); 
const nowMoreOneHour = now.clone().add(1,'hours'); 


const initState = {
    title : '',
    notes : '',
    start : now.toDate(),
    end : nowMoreOneHour.toDate(),
}

const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const [ dateStart , setDateStart] = useState( now.toDate());
    const [ dateEnd , setDateEnd] = useState( nowMoreOneHour.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [eventDetails, setEventDetails] = useState( initState);
    
    const { title , notes , start , end }  = eventDetails;


    useEffect(()=>{

        if(activeEvent){
            setEventDetails(activeEvent);
        }else{
            setEventDetails(initState);
        }

    },[activeEvent, setEventDetails])

    // useEffect(()=>{
    //     if(auxiliarEvent){
    //         setEventDetails(auxiliarEvent);
    //     }
    // },[auxiliarEvent])

    const handleInputChange = (e) => {

        setEventDetails({
            ...eventDetails,
            [e.target.name] : e.target.value
        })
    }

    const closeModal = () => {
        // setIsOpenModal(false);

        dispatch( uiCloseModal() )
        dispatch( eventClearActiveEvent());
        setEventDetails(initState);//Estamos reseteando
        console.log('Cerrando modal....');
    }

    const handleStartDateChange = ( date ) => {
        // console.log(date);
        setDateStart(date);
        setEventDetails({
            ...eventDetails,
            start : date
        })
    }
    const handleEndDateChange = ( date ) => {
        // console.log(date);
        setDateEnd(date);
        setEventDetails({
            ...eventDetails,
            end : date
        })
    }


    const handleSaveEvent = (e) => {
        e.preventDefault();
        // console.log(eventDetails);

        const startDate = moment(start);
        const startEnd = moment(end);

        if(startDate.isSameOrAfter(startEnd)){
            return Swal.fire('Error' , 'La fecha de fin debe ser después', 'error');
        }

        if(title.trim().length < 2){
            return setTitleValid(false);
        }


        if(activeEvent){
            dispatch( eventUpdated(eventDetails) )
        }else{

            dispatch( eventAddNew({
                ...eventDetails,
                id : new Date().getTime(),
                user : {
                    _id : '123',
                    name : 'Franco'
                }
            }));
        }

        setTitleValid(true);
        closeModal();
    }


   

    return (
        <div>
            <Modal
                isOpen={ modalOpen }
                /* onAfterOpen={afterOpenModal} */
                onRequestClose={ closeModal }
                style={customStyles}
                closeTimeoutMS ={ 200}
                className="modal"
                overlayClassName="modal-fondo"
            >
                <h1> {!!activeEvent ? 'Editar evento' : 'Nuevo evento'} </h1>
                <hr />
                <form 
                    className="container"
                    onSubmit= { handleSaveEvent }
                >

                    <div className="form-group mb-2">
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker
                            onChange={ handleStartDateChange }
                            value={ dateStart }
                            className="form-control"
                        />
                    </div>

                    <div className="form-group mb-2">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker
                            onChange={ handleEndDateChange }
                            value={ dateEnd }
                            minDate = { dateStart}
                            className="form-control"
                        />
                    </div>

                    <hr />
                    <div className="form-group mb-2">
                        <label>Titulo y notas</label>
                        <input 
                            type="text" 
                            className={`form-control ${!titleValid && "is-invalid"}`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value = { title }
                            onChange= { handleInputChange }
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group mb-2">
                        <textarea 
                            type="text" 
                            className={`form-control ${!titleValid && "is-invalid"}`}
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value = { notes }
                            onChange= { handleInputChange }
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary col-12 mt-2 mb-2"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>
            </Modal>
        </div>
    )
}

export default CalendarModal
