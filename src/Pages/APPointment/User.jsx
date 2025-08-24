import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Usecart from "../../Hook/Usecart";
import axiossecure from "../../Hook/Axios"; 
import Axios from "../../Hook/Axios";
import Swal from "sweetalert2";
const User = () => {
  const { user } = useContext(AuthContext); // Logged-in user
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart] = Usecart();
  const  axiossecure= Axios();

  useEffect(() => {
    // Fetch user-specific bookings from backend
    fetch(`http://localhost:5000/mycart?userEmail=${user?.email}`)
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

  //UPDate
  const handleupdate = (_id) => {
  axiossecure.patch(`/mycart/${_id}`, { status: "confirm" })
    .then(res => {
      if (res.data.modifiedCount > 0) {
        // UI তে যেটা update করব
        const updatedBookings = bookings.map(booking =>
          booking._id === _id ? { ...booking, status: "confirm" } : booking
        );
        setBookings(updatedBookings);

        Swal.fire({
          title: "Updated!",
          text: "Booking has been confirmed.",
          icon: "success"
        });
      }
    })
    .catch(err => console.error("Update error:", err));
};



// delete 
  const hancleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //   Swal.fire({
        //  title: "Deleted!",
        //  text: "Your file has been deleted.",
        //  icon: "success"
        //  });
        console.log("delete cofirmed");
        asxiossecure.delete(`/mycart/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            // remove from ui
            const remaining = bookings.filter(booking => booking._id !== _id);
            setBookings(remaining);
          }
        });
      }
    });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!bookings.length)
    return <p className="text-center mt-10">No bookings found.</p>;

  return (
    <div className="max-w-full mx-auto mt-10 px-2 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        My Bookings
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-xs md:text-sm lg:text-base">
          <thead className="bg-gray-100">
            <tr className="bg-gray-500 text-white">
              <th className="border px-2 md:px-4 py-2">#</th>
              <th className="border px-2 md:px-4 py-2">Service</th>
              <th className="border px-2 md:px-4 py-2">Booked Slot</th>
              <th className="border px-2 md:px-4 py-2">User name</th>
              <th className="border px-2 md:px-4 py-2">Date</th>
              <th className="border px-2 md:px-4 py-2">Number</th>
              <th className="border px-2 md:px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id} className="text-center">
                <td className="border px-2 md:px-4 py-2 text-red-700">
                  {index + 1}
                </td>
                <td className="border px-2 md:px-4 py-2 text-green-500">
                  {booking.name}
                </td>
                <td className="border px-2 md:px-4 py-2">{booking.bookslot}</td>
                <td className="border px-2 md:px-4 py-2">{booking.email}</td>
                <td className="border px-2 md:px-4 py-2">{booking.date}</td>
                <td className="border px-2 md:px-4 py-2">{booking.number}</td>
                <td className="border px-2 md:px-4 py-2 space-y-1 md:space-y-0 md:space-x-2 flex flex-col md:flex-row justify-center items-center">
                  <button 
                  onClick={()=>handleupdate(booking._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 md:px-3 py-1 rounded w-full md:w-auto">
                    Update
                  </button>
                  <button
                    onClick={() => hancleDelete(booking._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 md:px-3 py-1 rounded w-full md:w-auto"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
