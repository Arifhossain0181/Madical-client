import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Section4 = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 3; // প্রতি পেজে ৩ জন ডাক্তার দেখাবে

  // ডেটা ফেচ করা
  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error(err));
  }, []);

  // Pagination হিসাব
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // মোট কতগুলো পেজ হবে
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl mb-5">Our EXPERT Doctors</h1>
      </div>

      {/* এখানে ডাক্তার দেখাবে */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
        {currentDoctors.map((doctor) => (
          <div key={doctor.id} className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
                src={doctor.img_url || "https://via.placeholder.com/300"}
                alt={doctor.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{doctor.name}</h2>
              <p>{doctor.designation}</p>
              <div className="flex">
                {[...Array(Math.round(doctor.rating))].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <h5>{doctor.location}</h5>
              <h5>{doctor.available_time}</h5>
              <h5>{doctor.price}</h5>
              <div className="card-actions mt-2">
                <Link
                  to={`/doctorsviews/${doctor.id}`}
                  className="btn hover:bg-amber-600 w-full p-2 border-2 border-amber-600"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* নিচে Pagination বাটন */}
      <div className="flex justify-center mt-6 gap-2">
        {/* Prev Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 border rounded border-amber-600 disabled:opacity-50"
        >
          Prev
        </button>

        {/* Current Page */}
        <button className="px-3 py-1 border rounded bg-amber-600 text-white">
          {currentPage}
        </button>

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 border rounded  disabled:opacity-50 border-amber-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Section4;
