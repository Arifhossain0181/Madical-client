import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Section4 = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const doctorsPerPage = 3; // 
  useEffect(() => {
    fetch("http://localhost:5000/register-doctors-approved")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDoctors(data);
        } else {
          setDoctors([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setDoctors([]);
        setLoading(false);
      });
  }, []);

  // Pagination 
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // 
  const totalPages = Math.ceil(doctors.length / doctorsPerPage) || 1;

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl">Loading doctors...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl mb-5">Our EXPERT Doctors</h1>
      </div>

      {/* */}
      {doctors.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No doctors available at the moment.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
            {currentDoctors.map((doctor) => (
          <div key={doctor._id} className="card bg-base-100 w-96 shadow-sm">
            <figure className="px-4 pt-4">
              <img
                src={
                  doctor.files?.profilePhoto?.[0]?.path
                    ? `http://localhost:5000/${doctor.files.profilePhoto[0].path.replace("\\", "/")}`
                    : "https://via.placeholder.com/300"
                }
                alt={doctor.fullName}
                className="rounded-xl w-full h-64 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{doctor.fullName}</h2>
              <p className="text-gray-600">{doctor.specialization}</p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Education:</span>
                <span className="text-sm text-gray-600">{doctor.education || "N/A"}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Experience:</span>
                <span className="text-sm text-gray-600">{doctor.experience ? `${doctor.experience} years` : "N/A"}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Hospital:</span>
                <span className="text-sm text-gray-600">{doctor.hospital || "N/A"}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Available:</span>
                <span className="text-sm text-gray-600">{doctor.available_time || "N/A"}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-green-600">
                  ${doctor.consultationFee || "N/A"}
                </span>
                <span className="text-sm text-gray-500">consultation fee</span>
              </div>
              <div className="card-actions mt-2">
                <Link
                  to={`/doctorsviews/${doctor._id}`}
                  className="btn hover:bg-amber-600 w-full p-2 border-2 border-amber-600"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*some  */}
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
      </>
      )}
    </div>
  );
};

export default Section4;
