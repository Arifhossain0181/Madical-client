import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Section2serverID = () => {
  const { id } = useParams(); // এখানে id আসলে category name হবে
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/service")
      .then(res => res.json())
      .then(data => {
        // শুধু এই category এর services filter করব
        const filtered = data.filter(item => item.category === id);
        console.log("Filtered:", filtered);
        setServices(filtered);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 text-black">
      <h1 className="text-3xl font-bold text-center mb-6">
        Services in "{id}" Category
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="bg-white text-black shadow-md p-6 rounded-lg hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">{service.service}</h2>
            <img src={service.img} alt={service.service} className="w-20 h-20 object-contain mb-2 mx-auto" />
            <div className="text-sm text-gray-700 mb-2">Available Slots: {service.availableSlots ? service.availableSlots.join(', ') : 'None'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section2serverID;
