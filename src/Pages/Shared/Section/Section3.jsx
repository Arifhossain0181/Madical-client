import React, { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import { Swiper, SwiperSlide } from "swiper/react"; // Fixed import for Swiper and SwiperSlide
import { Navigation, Pagination } from "swiper/modules"; // Added import for Navigation and Pagination modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Section3 = () => {
  const [Patient, setPatient] = useState([]); // Removed incorrect destructuring

  useEffect(() => {
    fetch("Patients.json")
      .then((res) => res.json())
      .then((data) => {
        setPatient(data);
      });
  }, []);

  return (
    < div className="px-4 sm:px-8 lg:px-16 py-12 max-w-screen "> {/* Added responsive padding */}
      <div className="text-center mb-8 sm:mb-12"> {/* Adjusted margin for responsiveness */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">What Our Patients Says</h2> {/* Made text size responsive */}
        <h5 className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto"> {/* Added responsive text size and max-width */}
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. {/* Fixed typo: 'inve ntore' to 'inventore' */}
        </h5>
      </div>
      <div className="max-w-9xl mx-auto"> {/* Added container for Swiper */}
        <Swiper
          spaceBetween={20} // Added for slide spacing
          slidesPerView={1} // Default to 1 slide for mobile
          breakpoints={{ // Added responsive breakpoints
            640: { slidesPerView: 1 }, // sm: 1 slide
            1024: { slidesPerView: 2 }, // lg: 2 slides
          }}
          pagination={{ type: "fraction" }}
          navigation={true}
          modules={[Navigation, Pagination]} // Fixed modules import
          className="mySwiper"
        >
          {Patient.map((item, index) => (
            <SwiperSlide key={index}> {/* Moved SwiperSlide mapping here */}
              <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center text-center"> {/* Added card styling */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover" // Added responsive image styling
                />
                <h3 className="text-lg sm:text-xl font-semibold">{item.name}</h3> {/* Responsive text size */}
                <p className="text-sm sm:text-base text-gray-600 mt-2">{item.treatment}</p> {/* Responsive text size */}
                <p className="text-sm sm:text-base text-gray-600 mt-2">{item.testimonial}</p> {/* Responsive text size */}
                <p className="text-sm sm:text-base text-yellow-500 mt-2">Rating: {item.rating}/5</p> {/* Styled rating */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Section3;