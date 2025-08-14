import React from "react";
import { Link } from "react-router-dom";
import img1 from '../../../assets/img/banner1.jpg';
import img2 from '../../../assets/img/banner2.jpg';
import img3 from '../../../assets/img/banner3.jpg';

const Hero = () => {
  return (
    <section className="bg-[#033E3E] text-white">
      <div className="max-w-screen-full mx-auto px-6 lg:px-8 py-16 flex flex-col sm:flex-row items-center gap-12">
        
        {/* Left Content */}
        <div className="flex-1">
          {/* Main Text */}
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Your Best Medical <br /> Help Center
          </h1>
          <p className="mb-8 text-gray-300">
            Lorem Ipsum is simply dummy text they are <br /> printing typesetting has
            been the industry’s standard.
          </p>

          <Link
            to="/services"
            className="bg-orange-400 text-white font-medium px-6 py-3 rounded-md shadow hover:bg-orange-500 transition"
          >
            All Service
          </Link>
        </div>

        {/* Right Images */}
        <div className="flex-1 flex justify-center items-center relative">
          {/* Background Shapes */}
          <div className="absolute -z-10 w-72 h-72 bg-green-800 rounded-full top-0 right-0 opacity-50"></div>

          {/* Image Layout */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-6">
              <img
                src={img1}
                alt="Doctor"
                className="rounded-md shadow-lg transform rotate-[-5deg] w-48"
              />
              <img
                src={img2}
                alt="Doctor"
                className="rounded-md shadow-lg transform rotate-[3deg] w-48"
              />
            </div>
            <img
              src={img3}
              alt="Doctor"
              className="rounded-md shadow-lg transform rotate-[5deg] w-48 mt-10 sm:mt-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;