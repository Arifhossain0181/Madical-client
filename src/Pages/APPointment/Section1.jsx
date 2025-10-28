import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Axios from "../../Hook/Axios"; // adjust path if your hook is elsewhere
import heroImg from "../../assets/img/erik-mclean-AW7p7dXwG5U-unsplash.jpg";

const axiosSecure = Axios();

const fetchSpecializations = async () => {
  const res = await axiosSecure.get("/register-doctors-approved");
  const data = res.data;

  console.log("Fetched data:", data); // Debug log

  // Normalize to array of objects: { name, count? }
  if (!Array.isArray(data)) return [];
  if (data.length === 0) return [];

  // If backend returns full doctor objects with specialization field
  if (data[0].specialization !== undefined) {
    // Extract unique specializations and count them
    const specializationMap = {};
    data.forEach((doctor) => {
      const spec = doctor.specialization;
      if (spec) {
        specializationMap[spec] = (specializationMap[spec] || 0) + 1;
      }
    });
    
    // Convert to array of objects
    return Object.entries(specializationMap).map(([name, count]) => ({
      name,
      count
    }));
  }

  // If array of strings
  if (typeof data[0] === "string") {
    return data.map((name) => ({ name }));
  }

  // If array of aggregation objects like { _id: "Teeth", count: 3 }
  if (data[0]._id !== undefined && typeof data[0]._id === "string") {
    return data.map((d) => ({ name: d._id, count: d.count || 0 }));
  }

  // If array of objects like { name: "Teeth", count: 3 }
  if (data[0].name !== undefined) {
    return data.map((d) => ({ name: d.name, count: d.count || 0 }));
  }

  // fallback
  return [];
};

const Section1 = () => {
  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ["approvedSpecializations"],
    queryFn: fetchSpecializations,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      {/* Top Hero / Calendar area */}
      <div className="max-w-5xl mx-auto mt-6 bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-center">
          {/* Replace or remove calendar component you used before */}
          <div className="w-full max-w-xs p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Select a date</h3>
            <p className="text-sm text-gray-500">Use the calendar to pick appointment days</p>
            {/* placeholder for calendar */}
            <div className="mt-4 h-40 bg-gray-50 rounded-md flex items-center justify-center">
              <span className="text-sm text-gray-400">Calendar component</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full">
            <img
              src={heroImg}
              alt="Dentist"
              className="w-full h-72 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mt-10 max-w-6xl mx-auto text-black">
        <h1 className="text-3xl font-bold text-center mb-6">Please select a service</h1>

        {/* Loading / Error */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse text-gray-500">Loading specializations...</div>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-red-600">Failed to load specializations.</div>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-600">No approved specializations yet.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name + idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white shadow-md p-6 rounded-xl text-center hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold mb-3 capitalize">{cat.name}</h2>
                {cat.count !== undefined && (
                  <p className="text-sm text-gray-500 mb-3">
                    {cat.count} doctor{cat.count > 1 ? "s" : ""} available
                  </p>
                )}
                <Link
                  to={`/services/${encodeURIComponent(cat.name)}`}
                  className="inline-block bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
                >
                  View Services
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Section1;
