import React from 'react';

import { Link } from "react-router-dom";
import img3 from "../../assets/img/gAppointmentn-sGuiOqDse4c-unsplash.jpg";
import { FaCapsules } from "react-icons/fa"; // pill shape
import { GiArchBridge } from "react-icons/gi";

const APPiontmentBanner = () => {
    return (
        <div>
             <section className="bg-[#033E3E] text-white relative overflow-hidden">
      <div className="max-w-[1600px] h-[500px] mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Background Icons */}
        <div className="absolute left-2 sm:left-10 bottom-0 opacity-10 text-[120px] sm:text-[200px]">
          <GiArchBridge />
        </div>
        <div className="absolute right-4 sm:right-20 top-10 opacity-10 text-[90px] sm:text-[150px] rotate-45">
          <FaCapsules />
        </div>

        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-snug mb-6">
             <br className="hidden sm:block" /> 
          </h1>
         
          
        </div>

        {/* Right Images */}
        <div className="flex-1 flex justify-center items-center relative mt-12 lg:mt-0 z-10">
          {/* Background Circle */}
         

          {/* Image Layout */}
          <div className="flex gap-3 sm:gap-6">
           
          

            {/* Right Image */}
            <img
              src={img3}
              alt="Doctor"
              className="rounded-md shadow-lg transform rotate-[0deg] w-44 sm:w-94 lg:w-94 mt-6 sm:mt-6 lg:mt-6"
            />
          </div>
        </div>
      </div>
    </section>
        </div>
    );
};

export default APPiontmentBanner;