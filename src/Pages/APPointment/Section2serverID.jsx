import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Section2serverID = () => {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  // modal state
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/service")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.category === id);
        setServices(filtered);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const bookingData = {
      service: selectedService.service,
      date: form.date.value,
      time: form.time.value,
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
    };
    console.log("Booking Data:", bookingData);
    alert("Appointment submitted!");
    setSelectedService(null); 
    navigate('/user')// close modal after submit
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 text-black text-center font-bold">
      <h1 className="text-3xl font-bold text-center mb-6">
        Services in "{id}" Category
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white text-black shadow-md p-6 rounded-lg hover:shadow-xl transition"
          >
            <h3>{service.category}</h3>
            <h2 className="text-xl font-semibold mb-2">{service.service}</h2>
            <img
              src={service.img}
              alt={service.service}
              className="w-20 h-20 object-contain mb-2 mx-auto"
            />
            <div className="text-lg font-bold mb-2">${service.price}</div>
            <div className="text-sm text-gray-700 mb-2">
              Available Slots:{" "}
              {service.availableSlots
                ? service.availableSlots.join(", ")
                : "None"}
            </div>
            <div className="mt-4">
              <button
                onClick={() => setSelectedService(service)}
                className="btn btn-active hover:bg-amber-600 border-0"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* ✅ Background blur */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedService(null)} // background ক্লিক করলে modal close হবে
          ></div>

          {/* ✅ Modal */}
          <div className="bg-white p-6 rounded-lg w-96 relative z-10">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setSelectedService(null)} // modal close button
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">
              {selectedService.service}
            </h2>

            {/* Appointment Form */}
            {/* Appointment Form */}
<form onSubmit={handleSubmit} className="space-y-3">
  {/* ✅ Current Date Auto Select */}
  <input
    type="date"
    name="date"
    defaultValue={new Date().toISOString().split("T")[0]} // আজকের তারিখ
    className="w-full border p-2 rounded"
    required
  />

  {/* ✅ Available Slots Dropdown */}
  <select
    name="time"
    className="w-full border p-2 rounded"
    required
  >
    <option value="">Select Time Slot</option>
    {selectedService.availableSlots?.map((slot, index) => (
      <option key={index} value={slot}>
        {slot}
      </option>
    ))}
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
  <div>
    
  </div>
  <button
  
    type="submit"
    className="w-full bg-green-800 text-white py-2 rounded"
  >
       Submit
  </button>
</form>

          </div>
        </div>
      )}
    </div>
  );
};

export default Section2serverID;
