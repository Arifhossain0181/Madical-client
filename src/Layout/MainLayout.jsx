import React from 'react';
import Home from '../Layout/Home'
import { Outlet } from "react-router-dom";
import Navbar from '../Pages/Shared/Navbar/Navbar'
import Footer from '../Pages/Shared/Footer/Footer'
const MainLayout = () => {
    return (
        <div className=' max-w-screen-xl mx-auto'>
            <Navbar></Navbar>
               <Outlet ></Outlet>
               <Footer className='w-[1600px]'></Footer>
        </div>
    );
};

export default MainLayout;