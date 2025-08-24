import React from 'react';
import axios from 'axios';
const axiossecure = axios.create({
    baseURL: 'http://localhost:5000',

});
const Axios = () => {
    return axiossecure
};

export default Axios;