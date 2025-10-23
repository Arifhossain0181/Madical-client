import React from 'react';
import Home from '../Layout/Home'
import { Outlet } from "react-router-dom";
import Navbar from '../Pages/Shared/Navbar/Navbar'
import Footer from '../Pages/Shared/Footer/Footer'
import ChatButton from '../Chat/ChatButton';
const MainLayout = () => {
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage after login
    const doctorId = localStorage.getItem('doctorId'); // Assuming receiverId is stored in localStorage after login
    return (
        <div className=' max-w-screen-xl mx-auto'>
            <Navbar></Navbar>
               <Outlet ></Outlet>
               <Footer className='w-[1600px]'></Footer>
                    <ChatButton userId={userId} receiverId={doctorId} />
        </div>
    );
};

export default MainLayout;