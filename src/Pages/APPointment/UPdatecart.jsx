import React from "react";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Axios from "../../Hook/Axios";

const UPdatecart = ({ cart }) => {
    const {_id, name, price, email, bookslot } = cart || {};
  const [selectedService, setSelectedService] = useState();
  const axiossecure = Axios();
  const mycart = useLoaderData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const bookingData = {
      service: mycart.name,
      date: form.date.value,
      time: form.time.value,
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
    };

    // ✅ PATCH moved inside handleSubmit
    axiossecure
      .patch(`/mycart/${mycart._id}`, bookingData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          alert("Booking Updated Successfully ✅");
        } else {
          alert("No changes made ❌");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating booking ❌");
      });
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow mt-40">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Cart</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* ✅ Current Date Auto Select */}
        <input
          type="date"
          name="date"
          defaultValue={new Date().toISOString().split("T")[0]}
          className="w-full border p-2 rounded"
          required
        />

        {/* ✅ Available Slots Dropdown */}
        <select name="time" className="w-full border p-2 rounded" required>
          <option value="">Select Time Slot</option>
          {Array.isArray(mycart?.availableSlots) && mycart.availableSlots.length > 0
            ? mycart.availableSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))
            : Array.isArray(mycart?.bookslot) && mycart.bookslot.length > 0
              ? mycart.bookslot.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))
              : mycart?.bookslot
                ? <option value={mycart.bookslot}>{mycart.bookslot}</option>
                : <option disabled>No slots available</option>
          }
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

        <button
          type="submit"
          className="w-full bg-green-800 text-white py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UPdatecart;
