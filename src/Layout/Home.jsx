import React from 'react';
import { Outlet } from "react-router-dom";
import Banner from '../Pages/Shared/Banner/Banner'
import Section1 from '../Pages/Shared/Section/Section1'
import Section2 from '../Pages/Shared/Section/Section2'
import Section3 from '../Pages/Shared/Section/Section3' 
import Section4 from '../Pages/Shared/Section/Section4' 
const Home = () => {
    return (
        <div className=' '>
        <Banner></Banner>
        <Section1></Section1>
            
        <Section2></Section2>
        <Section3></Section3>
        <Section4></Section4>
        </div>
    );
};

export default Home;