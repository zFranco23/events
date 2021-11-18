import axios from 'axios'

const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_URL_BACKEND
})


export const requestAPI = async ( url = '' , body= { } , headers={} , method = 'GET') => {

    let response;
    switch (method) {
        case 'GET':
            response = await axiosInstance.get(url,{ headers });
            break;
        case 'POST':
            response = await axiosInstance.post(url, body , { headers});
            break;
        case 'PUT':
            response = await axiosInstance.put(url, body , { headers });
            break;
        case 'DELETE':
            response = await axiosInstance.delete(url, { headers });
            break;
        //AÑADIR MAS
        default://EL GET
            response = await axiosInstance.get(url,{ headers });
            break;
    }

    const { data } = response;

    return data;

}
