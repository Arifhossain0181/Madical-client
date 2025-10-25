import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Axios from "../Hook/Axios";
import { useState } from "react";
import { motion } from "framer-motion";
const Rejectlist = () => {
  const axiosSecure = Axios();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  // Fetch rejected doctors
  const { data: rejectedDoctors = [], isLoading } = useQuery({
    queryKey: ["rejectedDoctors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/register-doctors-rejected");
      return res.data;
    },
    refetchInterval: 5000, // Auto-refresh every 5 seconds
    refetchOnWindowFocus: true, // Refresh when user returns to tab
  });

  // Approve/Reject mutation
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/register-doctors-status/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["rejectedDoctors"]);
      Swal.fire({
        title: "Updated!",
        text: "Doctor status updated successfully!",
        icon: "success",
        confirmButtonColor: "#10B981",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    },
  });
  // Filter doctors based on search term
  const filteredDoctors = rejectedDoctors.filter((doctor) =>
    doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // delete mutation
  const deletedDoctors = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/register-doctors/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["rejectedDoctors"]);
      Swal.fire("Deleted!", "Doctor has been deleted!", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Unable to delete doctor.", "error");
    },
  });

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Rejected Doctors
      </h2>
      // search bar inside your component
      <motion.div
        className="mb-6 flex justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          whileFocus={{
            scale: 1.05,
            boxShadow: "0 0 8px rgba(59,130,246,0.6)",
          }}
          whileHover={{ scale: 1.02 }}
        />
      </motion.div>
      {rejectedDoctors.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No rejected doctors found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full border-collapse">
            <thead className="bg-red-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Specialization</th>
                <th className="px-4 py-3 text-left">Photo</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {rejectedDoctors.map((doctor, idx) => (
                <tr
                  key={doctor._id}
                  className="hover:bg-gray-100 transition text-gray-800"
                >
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2 font-medium">{doctor.fullName}</td>
                  <td className="px-4 py-2 text-sm">{doctor.email}</td>
                  <td className="px-4 py-2 text-sm">
                    {doctor.specialization || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    <img
                      src={
                        doctor.files?.profilePhoto?.[0]?.path
                          ? `http://localhost:5000/${doctor.files.profilePhoto[0].path.replace(
                              "\\",
                              "/"
                            )}`
                          : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                      }
                      alt="Doctor"
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() =>
                        updateStatus.mutate({
                          id: doctor._id,
                          status: "approved",
                        })
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        updateStatus.mutate({
                          id: doctor._id,
                          status: "rejected",
                        })
                      }
                      className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => deletedDoctors.mutate(doctor._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Rejectlist;
