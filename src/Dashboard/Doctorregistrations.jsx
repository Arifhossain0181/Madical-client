import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import Axios from "../Hook/Axios";

const DoctorRegistrations = () => {
  const { register, handleSubmit, reset } = useForm();
    const axiossecure = Axios();

  //  Mutation for submitting doctor registration
  const mutation = useMutation({
    mutationFn: async (formData) => {
      console.log(" Mutation started...");
      const res = await axiossecure.post("/register-doctor", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(" Backend Response:", res.data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("🎉 Success! Response:", data);
      Swal.fire({
        title: "Success!",
        text: "Doctor registration submitted successfully!",
        icon: "success",
        confirmButtonColor: "#10B981"
      });
      reset();
    },
    onError: (error) => {
      console.error(" Error occurred:", error);
      console.error(" Error response:", error.response?.data);
      console.error(" Error message:", error.message);
      Swal.fire("Error", "Something went wrong. Try again.", "error");
    },
  });

  const onSubmit = (data) => {
    console.log(" Form Data Received:", data);
    
    // Show loading indicator immediately
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait while files are being uploaded',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    const formData = new FormData();
    let fileCount = 0;
    
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList && value[0]) {
        const file = value[0];
        const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
        console.log(`📎 File '${key}': ${file.name} (${fileSizeMB} MB)`);
        formData.append(key, file);
        fileCount++;
      } else if (!(value instanceof FileList)) {
        console.log(` Field '${key}':`, value);
        formData.append(key, value);
      }
    });
    
    console.log(` Sending ${fileCount} file(s) to backend...`);
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 space-y-6 mt-16"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700">
          Doctor Registration
        </h2>

        {/*  Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register("fullName")} placeholder="Full Name" required className="input input-bordered w-full" />
          <input {...register("email")} type="email" placeholder="Email" required className="input input-bordered w-full" />
          <input {...register("phone")} type="text" placeholder="Phone Number" required className="input input-bordered w-full" />
          <select {...register("gender")} required className="input input-bordered w-full">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Professional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register("specialization")} placeholder="Specialization" required className="input input-bordered w-full" />
          <input {...register("experience")} type="number" placeholder="Years of Experience" className="input input-bordered w-full" />
          <input {...register("hospital")} placeholder="Hospital / Clinic" className="input input-bordered w-full" />
          <input {...register("consultationFee")} type="number" placeholder="Consultation Fee" className="input input-bordered w-full" />
        </div>

        {/* Documents Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-600">Medical License</label>
            <input {...register("license")} type="file" required className="file-input file-input-bordered w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Degrees / Certificates</label>
            <input {...register("degrees")} type="file" className="file-input file-input-bordered w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Profile Photo</label>
            <input {...register("profilePhoto")} type="file" className="file-input file-input-bordered w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">ID Proof</label>
            <input {...register("idProof")} type="file" required className="file-input file-input-bordered w-full" />
          </div>
        </div>

        {/* erms */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("terms")} required className="checkbox" />
          <p className="text-sm text-gray-600">
            I confirm that all provided information is accurate.
          </p>
        </div>

        {/*  Submit Button */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full btn bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:opacity-90 transition-all"
        >
          {mutation.isPending ? "Submitting..." : "Submit Registration"}
        </button>
      </form>
    </div>
  );
};

export default DoctorRegistrations;
