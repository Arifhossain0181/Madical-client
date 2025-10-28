// src/Pages/AppointmentList.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axiosSecure from "../Hook/Axios.jsx";

const AppointmentList = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: appointments = [], isLoading, isError } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/appointments-list");
      return res.data;
    },
  });

  // Frontend Filter + Search
  const filtered = appointments.filter((a) => {
    const searchMatch =
      a.doctor?.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.patient?.name?.toLowerCase().includes(search.toLowerCase());
    const statusMatch =
      filterStatus === "all" ? true : a.status === filterStatus;
    return searchMatch && statusMatch;
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full"
        />
      </div>
    );

 

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-center font-bold text-blue-700 mb-6">
        Appointment List
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-3">
        <input
          type="text"
          placeholder="Search by doctor or patient"
          className="border px-4 py-2 rounded-md w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded-md"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Specialization</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <motion.tr
                key={a._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b hover:bg-blue-50"
              >
                <td className="p-3 text-center font-semibold">{a.serial}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.time}</td>
                <td className="p-3">{a.doctor?.name || "N/A"}</td>
                <td className="p-3 text-blue-700">
                  {a.doctor?.specialization || "N/A"}
                </td>
                <td className="p-3">{a.patient?.name || "N/A"}</td>
                <td
                  className={`p-3 font-medium ${
                    a.status === "confirmed"
                      ? "text-green-600"
                      : a.status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {a.status}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="text-center mt-5 text-gray-500">
          No matching appointments
        </p>
      )}
    </div>
  );
};

export default AppointmentList;
