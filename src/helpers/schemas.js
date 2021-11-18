
import * as yup from 'yup';


export const schemaLogin = yup.object().shape({
    email : yup.string().email('*Invalid email').required('*Required'),
    password : yup.string().min(5,'*5 characters minimun').required('*Required')
})

export const schemaRegister = yup.object().shape({
    name : yup.string().required('Required'),
    email : yup.string().email('*Invalid email'),
    password: yup.string().required('*Password is required'),
    confirm_password: yup.string()
       .oneOf([yup.ref('password'), null], '*Passwords must match')
})