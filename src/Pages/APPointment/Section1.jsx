import React, { useState, useEffect } from 'react';
import img from '../../assets/img/erik-mclean-AW7p7dXwG5U-unsplash.jpg';
import { Link } from 'react-router-dom';
const Section1 = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/service')
      .then(res => res.json())
      .then(data => {
        setServices(data);

        // ✅ ইউনিক ক্যাটেগরি বের করা
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories.slice(0, 6)); // শুধু ৬টা ক্যাটেগরি নেব
      });
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen text-black'>
      {/* Top Section */}
      <div className='w-[900px] h-[355px] mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <calendar-date class="cally bg-base-100 border border-base-300 shadow-lg rounded-box">
            <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
            <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
            <calendar-month></calendar-month>
          </calendar-date>
        </div>
        <div>
          <div className='w-94 h-[0px]'>
            <img className='h-74 w-full rounded-lg' src={img} alt="Dentist Service" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className='mt-10'>
        <h1 className='text-3xl font-bold text-center mb-6'>Please select a service</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {categories.map((cat, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-xl text-center hover:shadow-xl transition">
              <h2 className="text-xl font-semibold mb-3">{cat}</h2>
              <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition">
              
                <Link to={`/services/${cat}`}>  View Services</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section1;
