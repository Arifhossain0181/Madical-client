import React from "react";
import img from "../../../assets/img/img3.jpg";
import img2 from "../../../assets/img/img2.jpg";
import { NavLink } from "react-router-dom";

const Section1 = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 sm:p-8 lg:p-20">{/* Changed to grid-cols-1 for mobile, adjusted padding */}
      <div className="left flex justify-center">{/* Added flex justify-center for mobile centering */}
        <img
          className="rounded-md w-full max-w-[500px] sm:h-[803px] object-cover"
          src={img}
          alt="Service Image"
        />
      </div>
      <div className="right flex flex-col items-start">{/* Added flex flex-col items-start for consistent alignment */}
        <h2 className="text-2xl sm:text-3xl mb-5 font-bold">Our Services</h2>{/* Adjusted text size for mobile */}
        <h6 className="text-sm sm:text-base mb-4 text-gray-600">{/* Added text size and color for readability */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quos
          sequi? Iste cupiditate molestias corporis.
        </h6>
        <div className="mt-4 mb-4 flex flex-wrap gap-3 lg:border-2 lg:p-5">{/* Added flex-wrap and gap for button layout */}
          <button className="btn btn-active px-4 py-2 text-sm sm:text-base hover:bg-amber-600">{/* Adjusted button size */}
            Cavity Protection
          </button>
          <button className="btn btn-active px-4 py-2 text-sm sm:text-base hover:bg-amber-600">{/* Adjusted button size */}
            Cosmetic Dentistry
          </button>
          <button className="btn btn-active px-4 py-2 text-sm sm:text-base hover:bg-amber-600">{/* Adjusted button size */}
            Oral Surgery
          </button>
        </div>
        <img
          className="rounded-md w-full max-w-[600px] h-auto sm:h-[250px] object-cover"
          src={img2}
          alt="Service Image"
        />
        <div>
          <h1 className="text-xl sm:text-3xl mt-5 mb-5 font-bold">{/* Adjusted text size for mobile */}
            Electro Gastrology Therapy
          </h1>
          <h6 className="text-sm sm:text-base mb-6 text-gray-600">{/* Added text size and color for readability */}
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Sed ut perspiciatis unde omnis iste natus error
          </h6>
          <button className="btn btn-active border-2 border-amber-600 px-4 py-2 text-sm sm:text-base ">{/* Adjusted button size */}
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section1;