import axios from 'axios'
const axiosInstance = axios.create({baseURL:'http://localhost:5000/api/'});
const Axios = axiosInstance.interceptors.request.use( req => {console.log('IN INTERCEPTOR')
    const Token = JSON.parse(localStorage.getItem('token'));
    if(Token) req.headers.Authorization =  Token;
    return req
});

export default Axios;