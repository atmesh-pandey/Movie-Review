import axios from 'axios';

const Axios = axios.create({
    baseURL: `https://api.themoviedb.org/`
})

export default Axios;
