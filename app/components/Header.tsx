import Image from 'next/image';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#4f6d44] py-4 px-8 md:px-16 flex items-center justify-between">
      {/* Logo bên trái */}
      <div className="flex items-center">
        <Image
          src="/images/logo.jpg"
          alt="Quế Thanh Garden Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1 className="text-white text-2xl font-bold ml-4">Quế Thanh Garden</h1>
      </div>
    </header>
  );
};

export default Header;
