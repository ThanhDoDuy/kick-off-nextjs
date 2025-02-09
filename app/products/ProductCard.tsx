"use client";

import { useEffect, useState } from 'react';

interface Product {
  name: string;
  price: number;
  image: string;  // File name (e.g., hoalan1.jpg)
  imageUrl?: string;  // Optional URL (nếu có từ database)
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(product.imageUrl || null);  // Nếu có URL từ database, dùng luôn

  useEffect(() => {
    // Chỉ gọi API nếu chưa có Pre-signed URL
    const fetchPresignedUrl = async () => {
      if (!imageUrl) {
        try {
          const response = await fetch(`/api/s3-get-presigned?key=${product.image}`);
          const data = await response.json();

          if (data.url) {
            setImageUrl(data.url);  // Cập nhật URL
          }
        } catch (error) {
          console.error('Error fetching Pre-signed URL:', error);
        }
      }
    };

    fetchPresignedUrl();
  }, [product.image, imageUrl]);

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-[300px] object-cover"
        />
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center bg-gray-200">
          <p>Loading...</p>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
