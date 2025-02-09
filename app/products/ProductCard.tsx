"use client";

import { useEffect, useState } from 'react';

interface Product {
  name: string;
  price: number;
  image: string;  // File name
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresignedUrl = async () => {
      try {
        const response = await fetch(`/api/s3-get-presigned?key=${product.image}`);
        const data = await response.json();

        if (data.url) {
          setImageUrl(data.url);
        }
      } catch (error) {
        console.error('Error fetching Pre-signed URL:', error);
      }
    };

    fetchPresignedUrl();
  }, [product.image]);  // Chỉ gọi khi `product.image` thay đổi

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt={product.name} />}
    </div>
  );
};

export default ProductCard;
