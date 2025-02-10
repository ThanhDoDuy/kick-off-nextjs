"use client";

import { useState } from 'react';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  imageURL: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(product.imageURL || null);
  
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Chỉ render <Image> nếu imageUrl hợp lệ */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={product.name}
          width={200}
          height={300}  // Cố định chiều cao ảnh
          className="w-full h-[300px] object-cover rounded"
        />
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center bg-gray-200">
          <p>Loading...</p>
        </div>
      )}
      <div className="p-4 flex flex-col justify-between">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        {/* <p className="text-gray-600">${product.price}</p> */}
      </div>
    </div>
  );
};

export default ProductCard;
