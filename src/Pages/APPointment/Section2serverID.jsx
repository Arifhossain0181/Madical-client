import React, { useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import Axios from "../../Hook/Axios";

const axiosSecure = Axios();

const fetchDoctors = async (specialization) => {
  const res = await axiosSecure.get("/register-doctors-approved");
  const data = res.data;
  if (!Array.isArray(data)) return [];
  return data.filter(
    (doc) => doc.specialization.toLowerCase() === specialization.toLowerCase()
  );
};

const Section2ServerID = () => {
  const { id } = useParams(); // specialization
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const { data: doctors = [], isLoading, isError } = useQuery({
    queryKey: ["approvedDoctors", id],
    queryFn: () => fetchDoctors(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const handleBooking = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    if (!user) {
      Swal.fire({
        title: "Please login first",
        text: "You need to login to book an appointment.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
      return;
    }

    const booking = {
      serviceId: selectedDoctor._id,
      doctorId: selectedDoctor._id,
      price: selectedDoctor.consultationFee,
      email: user.email,
      name: selectedDoctor.fullName,
      bookslot: form.time.value || selectedDoctor.available_time,
      phone: form.phone.value,
      date: form.date.value,
      patientName: form.name.value,
      patientEmail: form.email.value,
      specialization: selectedDoctor.specialization,
      hospital: selectedDoctor.hospital,
      status: "pending"
    };

    console.log("Booking data:", booking); // Debug log

    // Show loading
    Swal.fire({
      title: 'Booking...',
      text: 'Please wait',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const res = await axiosSecure.post("/mycart", booking);
      console.log("Backend response:", res.data); // Debug log
      
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire({
          title: "Appointment Confirmed!",
          text: `Your appointment with Dr. ${selectedDoctor.fullName} is booked.`,
          icon: "success",
          confirmButtonColor: "#10B981",
        });
        setSelectedDoctor(null);
        navigate("/user");
      } else {
        Swal.fire({
          title: "Success",
          text: "Appointment booked successfully!",
          icon: "success",
          confirmButtonColor: "#10B981",
        });
        setSelectedDoctor(null);
        navigate("/user");
      }
    } catch (err) {
      console.error("Booking error:", err); // Debug log
      console.error("Error response:", err.response?.data); // Debug log
      
      const errorMessage = err.response?.data?.message || err.message || "Failed to book appointment. Please try again.";
      
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading doctors...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load doctors list.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-black">
      <h1 className="text-3xl font-bold text-center mb-8 capitalize">
        Doctors in “{id}” Specialization
      </h1>

      {doctors.length === 0 ? (
        <p className="text-center text-gray-600">No approved doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc._id || i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-5 text-center"
            >
              <img
                src={
                  doc.files?.profilePhoto?.[0]?.path
                    ? `http://localhost:5000/${doc.files.profilePhoto[0].path}`
                    : "https://via.placeholder.com/120"
                }
                alt={doc.fullName}
                className="w-24 h-24 mx-auto rounded-full border mb-3 object-cover"
              />
              <h2 className="text-lg font-bold">{doc.fullName}</h2>
              <p className="text-sm text-gray-600 mb-1">{doc.education}</p>
              <p className="text-sm text-gray-600 mb-1">
                {doc.hospital || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <b>Available:</b> {doc.available_time}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Fee: ৳{doc.consultationFee}
              </p>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedDoctor(doc)}
                className="mt-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
              >
                Book Appointment
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}

      {/*  Modal for Booking */}
      <AnimatePresence>
  {selectedDoctor && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setSelectedDoctor(null)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-96 rounded-lg p-6 shadow-lg relative"
      >
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
          onClick={() => setSelectedDoctor(null)}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-2 text-center">
          Dr. {selectedDoctor.fullName}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          {selectedDoctor.specialization} • {selectedDoctor.hospital}
        </p>

        <form onSubmit={handleBooking} className="space-y-3">
          {/* Date selection */}
          <input
            type="date"
            name="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            className="w-full border p-2 rounded"
            required
          />

          {/* Time selection dropdown */}
          <select
            name="time"
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Time Slot</option>
            {selectedDoctor.available_time && selectedDoctor.available_time.split(',').length > 0 ? (
              selectedDoctor.available_time.split(',').map((slot, i) => (
                <option key={i} value={slot.trim()}>
                  {slot.trim()}
                </option>
              ))
            ) : (
              <option value={selectedDoctor.available_time || "N/A"}>
                {selectedDoctor.available_time || "N/A"}
              </option>
            )}
          </select>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />

          {/* Serial number display */}
          <p className="text-gray-600 text-sm">
            Serial: {selectedDoctor.nextSerial || 1}
          </p>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
          >
            Confirm Appointment
          </button>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default Section2ServerID;
