import React from 'react'

import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { startLogin, startRegister } from '../../redux/actions/auth';

import { schemaLogin, schemaRegister } from '../../helpers/schemas';

import './login.css';

const LoginScreen = () => {

    const dispatch = useDispatch();
    const { register , handleSubmit } = useForm({
        resolver : yupResolver(schemaLogin)
    });

    const { register : registerCreate , handleSubmit : handleSubmitRegister } = useForm({
        resolver : yupResolver(schemaRegister)
    });


    const handleLogin = ( values ) => {

        dispatch( startLogin(values) );
    }

    const handleRegister = ({name ,  email , password}) => {

        dispatch( startRegister({ name , email , password}) );
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit= { handleSubmit(handleLogin)}>
                        <div className="form-group wrapper__input">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                {...register('email')}
                            />
                        </div>
                        <div className="form-group wrapper__input">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                {...register('password')}
                            />
                        </div>
                        <div className="form-group wrapper__input">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit = { handleSubmitRegister(handleRegister)}>
                        <div className="form-group wrapper__input">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                {...registerCreate('name')}
                            />
                        </div>
                        <div className="form-group wrapper__input">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                {...registerCreate('email')}
                            />
                        </div>
                        <div className="form-group wrapper__input">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                {...registerCreate('password')} 
                            />
                        </div>

                        <div className="form-group wrapper__input">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                {...registerCreate('confirm_password')} 
                            />
                        </div>

                        <div className="form-group wrapper__input">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
