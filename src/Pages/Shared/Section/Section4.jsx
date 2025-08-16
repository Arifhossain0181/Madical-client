import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Section4 = () => {
  const [doctors, setDoctors] = useState([]);
  const slice = doctors.slice(0, 3);

  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl mb-5">Our EXPERT Doctors</h1>
        <h5 className="text-gray-400">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </h5>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
        {slice.map((doctor) => {
          const {
            id,
            img_url,
            name,
            designation,
            rating,
            location,
            available_time,
            price,
          } = doctor;

          return (
            <div key={id} className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <img
                  src={img_url || "https://via.placeholder.com/300"}
                  alt={name}
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{designation}</p>

                <div className="flex">
                  {[...Array(Math.round(rating))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>

                <h5>{location}</h5>
                <h5>{available_time}</h5>
                <h5>{price}</h5>

                <div className="card-actions mt-2">
                  <Link
                    to={`/doctorsviews/${id}`}
                    className="btn hover:bg-amber-600 w-full p-2 border-2 border-amber-600"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Section4;
