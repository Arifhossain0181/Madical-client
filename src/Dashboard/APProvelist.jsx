import React from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "../Hook/Axios";
import { motion } from "framer-motion";
const axiosSecure = Axios();
import { useState } from "react";

const ApproveList = () => {
      const [searchTerm, setSearchTerm] = useState("");
    
  const {
    data: approvedDoctors = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approvedDoctors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/register-doctors-approved");
      return res.data;
    },
  });

  // Filter doctors based on search term
  const filteredDoctors = approvedDoctors.filter((doctor) =>
    doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading approved doctors...
      </p>
    );

  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load approved doctors.
      </p>
    );

  return (
    <div className="p-4 md:p-6 lg:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        Approved Doctors List
      </h2>
     
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

      {searchTerm && filteredDoctors.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center mb-6"
        >
          <p className="font-semibold">
            No doctor found with name "{searchTerm}"
          </p>
        </motion.div>
      )}

      {filteredDoctors.length === 0 && !searchTerm ? (
        <p className="text-center text-gray-600">No approved doctors found.</p>
      ) : filteredDoctors.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="table-auto min-w-full border-collapse">
            <thead className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <tr className="text-sm md:text-base">
                <th className="px-2 py-2 md:px-4 md:py-3">#</th>
                <th className="px-2 py-2 md:px-4 md:py-3">Name</th>
                <th className="px-2 py-2 md:px-4 md:py-3">Specialization</th>
                <th className="px-2 py-2 md:px-4 md:py-3 hidden sm:table-cell">
                  Email
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3">License</th>
                <th className="px-2 py-2 md:px-4 md:py-3">ID Proof</th>
                <th className="px-2 py-2 md:px-4 md:py-3">Photo</th>
              </tr>
            </thead>

            <tbody>
              {filteredDoctors.map((doctor, idx) => (
                <tr
                  key={doctor._id}
                  className="hover:bg-gray-100 transition text-sm md:text-base text-black"
                >
                  <td className="px-2 py-1 md:px-4 md:py-2">{idx + 1}</td>
                  <td className="px-2 py-1 md:px-4 md:py-2 font-semibold">
                    {doctor.fullName}
                  </td>
                  <td className="px-2 py-1 md:px-4 md:py-2">
                    {doctor.specialization}
                  </td>
                  <td className="px-2 py-1 md:px-4 md:py-2 hidden sm:table-cell">
                    {doctor.email}
                  </td>

                  {/* License */}
                  <td className="px-2 py-1 md:px-4 md:py-2">
                    {doctor.files?.license?.length > 0 ? (
                      doctor.files.license.map((file) => (
                        <div key={file.filename}>
                          <a
                            href={`http://localhost:5000/uploads/${encodeURIComponent(
                              file.filename
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            📄 View
                          </a>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">No file</span>
                    )}
                  </td>

                  {/* ID Proof */}
                  <td className="px-2 py-1 md:px-4 md:py-2">
                    {doctor.files?.idProof?.length > 0 ? (
                      doctor.files.idProof.map((file) => (
                        <div key={file.filename}>
                          <a
                            href={`http://localhost:5000/uploads/${encodeURIComponent(
                              file.filename
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            📄 View
                          </a>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">No file</span>
                    )}
                  </td>

                  {/* Profile Photo */}
                  <td className="px-2 py-1 md:px-4 md:py-2">
                    {doctor.files?.profilePhoto?.length > 0 ? (
                      doctor.files.profilePhoto.map((file) => (
                        <img
                          key={file.filename}
                          src={`http://localhost:5000/${file.path.replace(
                            "\\",
                            "/"
                          )}`}
                          alt={doctor.fullName}
                          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border"
                        />
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">No photo</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default ApproveList;
