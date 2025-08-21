import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // fixed import path
import { useLocation } from 'react-router-dom'; // fixed import path
import { Navigate } from 'react-router-dom';
const Privateroutes = ({children}) => {
    const {user ,loading} = useContext(AuthContext);
    const location = useLocation()

    if(loading){
        return <Navigate to='/' replace/>; // redirect to home if loading
    }
    if(user) return children; // return children if user is authenticated
    return <Navigate to='/login' state={{from: location} } replace/>; // redirect to login if not authenticated
};

export default Privateroutes;