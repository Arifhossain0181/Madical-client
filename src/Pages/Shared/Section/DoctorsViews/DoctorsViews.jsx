import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
const DoctorsViews = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(`http://localhost:5000/doctors/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Doctor not found");
                return res.json();
            })
            .then((data) => {
                setDoctor(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setDoctor(null);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto mt-10 p-4 shadow-lg bg-white text-center">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto mt-10 p-4 shadow-lg bg-white text-center">
                {error}
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="max-w-3xl mx-auto mt-10 p-4 shadow-lg bg-white text-center">
                Doctor not found.
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-4 shadow-lg bg-white">
            <figure>
                <img
                    src={doctor.img_url || "https://via.placeholder.com/300"}
                    alt={doctor.name || "Doctor"}
                    className="w-full h-96 object-cover"
                />
            </figure>
            <h1 className="text-3xl font-bold mt-4">{doctor.name}</h1>
            <h3 className="text-xl text-gray-600">{doctor.designation}</h3>
            <div className="flex mt-2">
                {[...Array(Math.round(doctor.rating || 0))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                ))}
            </div>
            <p className="mt-4"><strong>Location:</strong> {doctor.location}</p>
            <p><strong>Available Time:</strong> {doctor.available_time}</p>
            <p><strong>Price:</strong> {doctor.price}</p>
            <p className="mt-4"><strong>About:</strong> {doctor.about}</p>
            <p><strong>Education:</strong> {doctor.education}</p>
            <p><strong>Awards:</strong> {Array.isArray(doctor.awards) ? doctor.awards.join(', ') : doctor.awards}</p>
            <p><strong>Work Experience:</strong> {doctor.work_experience}</p>
            <p><strong>Services:</strong> {Array.isArray(doctor.services) ? doctor.services.join(', ') : doctor.services}</p>
            <p><strong>Specializations:</strong> {Array.isArray(doctor.specializations) ? doctor.specializations.join(', ') : doctor.specializations}</p>
        </div>
    );
};

export default DoctorsViews;

