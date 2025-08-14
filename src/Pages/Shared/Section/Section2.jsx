import React from 'react';
import { FaClock, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Section2 = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto'>
            {/* Opening Hours Card */}
            <div className='bg-green-950 p-8 rounded-xl text-white flex flex-col gap-3 hover:shadow-lg transition-shadow'>
                <div className='flex items-center gap-4'>
                    <div className='bg-amber-500 p-4 rounded-full'>
                        <FaClock className='text-md' />
                    </div>
                    <h2 className='text-xl font-bold uppercase'>Opening Hours</h2>
                </div>
                <div className='ml-16 space-y-1'>
                    <p className='text-gray-300'>Open 8.00 am to 5.00 pm</p>
                    <p className='text-gray-300'>Everyday</p>
                </div>
            </div>

            {/* Location Card */}
            <div className='bg-amber-500 p-8 rounded-xl text-gray-900 flex flex-col gap-3 hover:shadow-lg transition-shadow'>
                <div className='flex items-center gap-4'>
                    <div className='bg-green-950 p-3 rounded-full text-white'>
                        <FaMapMarkerAlt className='text-xl' />
                    </div>
                    <h2 className='text-xl font-bold uppercase'>Our Locations</h2>
                </div>
                <div className='ml-16 space-y-1'>
                    <p className='text-gray-800'>Dharmond T7, Dhaka</p>
                    <p className='text-gray-800'>-1200, Bangladesh</p>
                </div>
            </div>

            {/* Contact Card */}
            <div className='bg-green-950 p-8 rounded-xl text-white flex flex-col gap-3 hover:shadow-lg transition-shadow'>
                <div className='flex items-center gap-4'>
                    <div className='bg-amber-500 p-3 rounded-full'>
                        <FaPhone className='text-xl' />
                    </div>
                    <h2 className='text-xl font-bold uppercase'>Contact Us</h2>
                </div>
                <div className='ml-16 space-y-1'>
                    <p className='text-gray-300'>+88 01750 00 00 00</p>
                    <p className='text-gray-300'>+88 01750 00 00 00</p>
                </div>
            </div>
        </div>
    );
};

export default Section2;