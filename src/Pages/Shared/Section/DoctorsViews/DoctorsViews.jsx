import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Doctorsbanner from "../../Section/DoctorsViews/Doctorsbanner";

const DoctorsViews = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:5000/register-doctors/${id}`) // Updated endpoint
      .then((res) => {
        if (!res.ok) throw new Error("Doctor not found");
        return res.json();
      })
      .then((data) => {
        console.log("Doctor data received:", data); // Debug log
        setDoctor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctor:", err); // Debug log
        setError(err.message);
        setDoctor(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4 shadow-lg bg-white text-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4 shadow-lg bg-white text-center">
        {error}
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4 shadow-lg bg-white text-center">
        Doctor not found.
      </div>
    );
  }

  // Get profile photo URL
  const profilePhoto =
    doctor.files?.profilePhoto?.[0]?.path
      ? `http://localhost:5000/${doctor.files.profilePhoto[0].path.replace("\\", "/")}`
      : "https://via.placeholder.com/300";

  return (
    <>
      <Doctorsbanner />

      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Photo */}
          <div className="flex justify-center items-start">
            <img
              src={profilePhoto}
              alt={doctor.fullName}
              className="w-64 h-64 object-cover rounded-xl border-4 border-blue-500 shadow-md"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex flex-col justify-start text-black">
            <h1 className="text-3xl font-bold">{doctor.fullName}</h1>
            <h3 className="text-xl mt-1">{doctor.specialization}</h3>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Education:</span> {doctor.education || "N/A"}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Experience:</span> {doctor.experience ? `${doctor.experience} years` : "N/A"}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Gender:</span> {doctor.gender || "N/A"}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Phone:</span> {doctor.phone || "N/A"}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Email:</span> {doctor.email || "N/A"}
            </p>
            <p className="mt-2 text-blue-600 font-semibold">
              <span className="font-semibold">Available:</span> {doctor.available_time || "N/A"}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Hospital:</span> {doctor.hospital || "N/A"}
            </p>
            <p className="mt-2 text-green-600 font-bold text-xl">
              Fee: ${doctor.consultationFee || "N/A"}
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-inner text-gray-700">
          <h2 className="text-2xl font-bold mb-3">About Doctor</h2>
          <p>{doctor.about || "Experienced medical professional dedicated to providing quality healthcare."}</p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Documents</h2>
          <div className="space-y-2">
            {doctor.files?.license && doctor.files.license.length > 0 ? (
              doctor.files.license.map((file, i) => (
                <div key={i} className="flex gap-2">
                  <a
                    href={`http://localhost:5000/uploads/${encodeURIComponent(file.filename)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    📄 License Document {i + 1}
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No license documents available</p>
            )}
            
            {doctor.files?.degrees && doctor.files.degrees.length > 0 ? (
              doctor.files.degrees.map((file, i) => (
                <div key={i} className="flex gap-2">
                  <a
                    href={`http://localhost:5000/uploads/${encodeURIComponent(file.filename)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    📄 Degree Document {i + 1}
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No degree documents available</p>
            )}

            {doctor.files?.idProof && doctor.files.idProof.length > 0 && (
              doctor.files.idProof.map((file, i) => (
                <div key={i} className="flex gap-2">
                  <a
                    href={`http://localhost:5000/uploads/${encodeURIComponent(file.filename)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    📄 ID Proof {i + 1}
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorsViews;
