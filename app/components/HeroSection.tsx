'use client'; // If using Next.js App Router

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation'; // For navigation

const HeroSection: React.FC = () => {
  const router = useRouter(); // Initialize router for navigation

  const handleButtonClick = () => {
    router.push('/products'); // Navigate to the products page
  };

  return (
    <section className="bg-[#edf0f2] px-8 md:px-16 flex items-center min-h-screen">
      <div className="flex flex-col md:flex-row items-center md:items-stretch w-full">
        {/* Left - Full Image */}
        <div className="w-full md:w-1/2 relative min-h-screen">
          <Image
            src="/images/plants.jpg"
            alt="Garden Plants"
            layout="fill"
            className="object-cover"
            priority
          />
        </div>

        {/* Right - Full Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center px-8 md:px-12">
          <h1 className="font-[Arimo] text-[60px] text-gray-600 leading-tight transform -skew-x-12">
            Quế Thanh
            <span 
              className="block font-[League Gothic] text-[140px] text-green-600 leading-none transform -skew-x-12"
              style={{ fontWeight: 700 }}
            >
              GARDEN
            </span>
          </h1>
          <p className="mt-4 text-3xl text-gray-600 md:text-4xl">Vẻ đẹp thuần khiết của hoa lan</p>

          {/* Centered Button */}
          <div className="mt-8 md:mt-16 flex justify-center">
            <button 
              onClick={handleButtonClick} 
              className="rounded-full border-4 border-black px-12 py-6 text-2xl text-black hover:bg-black hover:text-white transition flex items-center gap-4"
            >
              Mua Ngay
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
