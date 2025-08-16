import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../../assets/img/banner1.jpg";
import img2 from "../../../assets/img/banner2.jpg";
import img3 from "../../../assets/img/banner3.jpg";
import { FaCapsules } from "react-icons/fa"; // pill shape
import { GiArchBridge } from "react-icons/gi";

const Hero = () => {
  return (
    <section className="bg-[#033E3E] text-white relative overflow-hidden">
      <div className="max-w-[1600px] h-[700px] mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between">
        
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
            Your Best Medical <br className="hidden sm:block" /> Help Center
          </h1>
          <p className="mb-8 text-gray-300 text-sm sm:text-base lg:text-lg max-w-md mx-auto lg:mx-0">
            Lorem Ipsum is simply dummy text they are printing typesetting has
            been the industry’s standard.
          </p>
          <Link
            to="/services"
            className="bg-orange-400 text-white font-semibold px-5 py-3 rounded-md shadow hover:bg-orange-500 transition"
          >
            All Service
          </Link>
        </div>

        {/* Right Images */}
        <div className="flex-1 flex justify-center items-center relative mt-12 lg:mt-0 z-10">
          {/* Background Circle */}
          <div className="absolute -z-10 w-40 sm:w-56 lg:w-[400px] h-40 sm:h-56 lg:h-[400px] bg-green-900 rounded-full top-0 right-0 opacity-30"></div>

          {/* Image Layout */}
          <div className="flex gap-3 sm:gap-6">
            {/* Left Stack */}
            <div className="flex flex-col gap-3 sm:gap-6 mt-4 sm:mt-10">
              <img
                src={img1}
                alt="Doctor"
                className="rounded-md shadow-lg transform rotate-[-5deg] w-28 sm:w-40 lg:w-60"
              />
              <img
                src={img2}
                alt="Doctor"
                className="rounded-md shadow-lg transform rotate-[3deg] w-28 sm:w-40 lg:w-60"
              />
            </div>

            {/* Right Image */}
            <img
              src={img3}
              alt="Doctor"
              className="rounded-md shadow-lg transform rotate-[5deg] w-28 sm:w-40 lg:w-60 mt-6 sm:mt-12 lg:mt-16"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
