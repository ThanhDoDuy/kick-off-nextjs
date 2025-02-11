"use client";

import { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);

  // Hàm kiểm tra URL hiện tại có phải là Public URL không
  const isPublicS3Url = (url: string) => {
    return url.startsWith('https://') && url.includes('amazonaws.com') && !url.includes('Signature');
  };

  const handleImageValidation = async () => {
    if (isLoading) return;  // Nếu đang xử lý, không gọi lại

    setIsLoading(true);

    try {
      // Gọi API tạo Presigned URL mới
      const res = await fetch(`/api/products/update-presigned-url?productId=${product._id}`);
      const data = await res.json();

      if (res.ok && data.newImageURL) {
        const img = new window.Image();
        img.src = data.newImageURL;
        img.onload = () => {
          setImageUrl(data.newImageURL);  // Cập nhật URL mới
        };
      } else {
        console.error('Failed to update presigned URL:', data.error);
      }
    } catch (error) {
      console.error('Error updating presigned URL:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Nếu URL là Public URL, tự động tạo lại Presigned URL
    if (isPublicS3Url(product.imageURL)) {
      handleImageValidation();
    }
  }, [product.imageURL]);

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={product.name}
          width={200}
          height={300}
          className="w-full h-[400px] object-cover rounded"
          onError={handleImageValidation}  // Gọi lại nếu ảnh không tải được
        />
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center bg-gray-200">
          <p>{isLoading ? 'Đang cập nhật ảnh...' : 'Không thể tải ảnh'}</p>
        </div>
      )}

      <div className="p-4 flex flex-col justify-between items-center bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
        <h2 className="mt-2 text-md text-gray-600 text-center">
          <a
            href="https://www.facebook.com/quethanh126"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold hover:underline"
          >
            Liên hệ chúng tôi
          </a>
          <span className="ml-2">để được <span className="text-green-600 font-semibold">giá tốt nhất</span> nha</span>
        </h2>
      </div>
    </div>
  );
};

export default ProductCard;
