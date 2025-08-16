import React from "react";
import { FaCapsules } from "react-icons/fa"; // pill shape
import { GiArchBridge } from "react-icons/gi"; // arch-like shape

const Doctorsbanner = () => {
  return (
    <div className="bg-[#00332C] text-white pt-32 pb-20 relative overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute left-10 bottom-0 opacity-10 text-[200px]">
        <GiArchBridge />
      </div>
      <div className="absolute right-20 top-10 opacity-10 text-[150px] rotate-45">
        <FaCapsules />
      </div>

      {/* Banner Text */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <p className="text-sm mb-2">Home / Doctor Profile</p>
        <h1 className="text-4xl font-bold">Doctor Profile</h1>
      </div>
    </div>
  );
};

export default Doctorsbanner;
