import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Stethoscope, Users, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-16 px-6 md:px-20 text-gray-800">
      {/* Header Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
          About <span className="text-cyan-600">TheMedical</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Your trusted digital healthcare companion — connecting patients and doctors with
          simplicity, security, and care.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        className="grid md:grid-cols-2 gap-10 items-center mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div>
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At <b>TheMedical</b>, our mission is to make healthcare accessible to everyone.
            We believe that technology can make medical appointments, consultations, and
            doctor-patient connections faster, easier, and safer.
          </p>
          <p className="mt-4 text-gray-700">
            From booking appointments to online consultations, we’re here to help you
            manage your health with confidence and convenience.
          </p>
        </div>
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/4320/4320371.png"
          alt="Mission Illustration"
          className="w-80 mx-auto"
          whileHover={{ scale: 1.05 }}
        />
      </motion.div>

      {/* Values Section */}
      <motion.div
        className="bg-white rounded-3xl shadow-lg p-10 mb-20"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
          Our Core Values
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            {
              icon: <HeartPulse className="w-10 h-10 text-red-500 mx-auto mb-4" />,
              title: "Compassion",
              desc: "We put care at the heart of every service we deliver.",
            },
            {
              icon: <ShieldCheck className="w-10 h-10 text-green-500 mx-auto mb-4" />,
              title: "Trust & Safety",
              desc: "Your data and health privacy are always protected.",
            },
            {
              icon: <Stethoscope className="w-10 h-10 text-blue-500 mx-auto mb-4" />,
              title: "Innovation",
              desc: "We continuously improve through technology and feedback.",
            },
            {
              icon: <Users className="w-10 h-10 text-purple-500 mx-auto mb-4" />,
              title: "Community",
              desc: "Building a healthier, stronger community together.",
            },
          ].map((value, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-100 hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              {value.icon}
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer Section */}
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <p className="text-gray-600 text-lg">
          © {new Date().getFullYear()} <b>TheMedical</b>. All Rights Reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
