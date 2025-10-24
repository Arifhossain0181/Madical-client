import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Axios from "../Hook/Axios";

const axiosSecure = Axios();

const ManageDoctors = () => {
  const queryClient = useQueryClient();

  // Fetch all doctors
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/register-doctors-all");
      return res.data;
    },
  });

  // Approve / Reject mutation with optimistic update
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/register-doctors-status/${id}`, {
        status,
      });
      return res.data;
    },
    onMutate: async ({ id, status }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(["doctors"]);

      // Snapshot previous value
      const previousDoctors = queryClient.getQueryData(["doctors"]);

      // Optimistically update the status in cache
      queryClient.setQueryData(["doctors"], (old = []) =>
        old.map((doc) => (doc._id === id ? { ...doc, status } : doc))
      );

      return { previousDoctors };
    },
    onError: (err, variables, context) => {
      // Rollback to previous data if mutation fails
      queryClient.setQueryData(["doctors"], context.previousDoctors);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong! Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Doctor status updated successfully!",
        icon: "success",
        confirmButtonColor: "#10B981",
      });
    },
  });

  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading doctors...</p>;

  return (
    <div className="p-4 md:p-6 lg:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        Manage Doctors
      </h2>

      <div className="overflow-x-auto w-full bg-white shadow-lg rounded-lg">
        <table className="table-auto min-w-full border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
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
              <th className="px-2 py-2 md:px-4 md:py-3">Status</th>
              <th className="px-2 py-2 md:px-4 md:py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {doctors.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-600">
                  No doctors found.
                </td>
              </tr>
            )}

            {doctors.map((doctor, idx) => (
              <tr
                key={doctor._id}
                className="hover:bg-gray-100 transition text-sm md:text-base text-black"
              >
                <td className="px-2 py-1 md:px-4 md:py-2">{idx + 1}</td>
                <td className="px-2 py-1 md:px-4 md:py-2">{doctor.fullName}</td>
                <td className="px-2 py-1 md:px-4 md:py-2">{doctor.specialization}</td>
                <td className="px-2 py-1 md:px-4 md:py-2 hidden sm:table-cell">
                  {doctor.email}
                </td>

                {/* License */}
                <td className="px-2 py-1 md:px-4 md:py-2">
                  {doctor.files?.license?.length > 0 ? (
                    doctor.files.license.map((file) => (
                      <div key={file.filename} className="flex flex-col gap-1">
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
                        <a
                          href={`http://localhost:5000/uploads/${encodeURIComponent(
                            file.filename
                          )}`}
                          download={file.originalname}
                          className="text-green-600 underline hover:text-green-800 text-xs"
                        >
                          ⬇️ Download
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
                      <div key={file.filename} className="flex flex-col gap-1">
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
                        <a
                          href={`http://localhost:5000/uploads/${encodeURIComponent(
                            file.filename
                          )}`}
                          download={file.originalname}
                          className="text-green-600 underline hover:text-green-800 text-xs"
                        >
                          ⬇️ Download
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
                        src={`http://localhost:5000/${file.path.replace("\\", "/")}`}
                        alt={doctor.fullName}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border"
                      />
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">No photo</span>
                  )}
                </td>

                {/* Status */}
                <td className="px-2 py-1 md:px-4 md:py-2">
                  <span
                    className={`badge ${
                      doctor.status === "approved"
                        ? "badge-success"
                        : doctor.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {doctor.status || "pending"}
                  </span>
                </td>

                {/* Action */}
                <td className="px-2 py-1 md:px-4 md:py-2">
                  {doctor.status === "approved" ? (
                    <button
                      disabled
                      className="btn btn-xs md:btn-sm bg-green-500 text-white cursor-not-allowed"
                    >
                      Approved
                    </button>
                  ) : doctor.status === "rejected" ? (
                    <button
                      disabled
                      className="btn btn-xs md:btn-sm bg-red-500 text-white cursor-not-allowed"
                    >
                      Rejected
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() =>
                          updateStatus.mutate({ id: doctor._id, status: "approved" })
                        }
                        className="btn btn-xs md:btn-sm bg-green-500 text-white hover:bg-green-600"
                        disabled={updateStatus.isLoading}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          updateStatus.mutate({ id: doctor._id, status: "rejected" })
                        }
                        className="btn btn-xs md:btn-sm bg-red-500 text-white hover:bg-red-600"
                        disabled={updateStatus.isLoading}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctors;
