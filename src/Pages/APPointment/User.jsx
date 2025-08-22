import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const User = () => {
  const { user } = useContext(AuthContext); // Logged-in user
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user-specific bookings from backend
    fetch(`http://localhost:5000/bookings?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!bookings.length)
    return <p className="text-center mt-10">No bookings found.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">My Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Service</th>
              <th className="border px-4 py-2">Booked Slot</th>
              <th className="border px-4 py-2">User Name</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{booking.service}</td>
                <td className="border px-4 py-2">
                  {booking.date} | {booking.time}
                </td>
                <td className="border px-4 py-2">{booking.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
