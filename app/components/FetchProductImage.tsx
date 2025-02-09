import React, { useEffect, useState } from 'react';

interface FetchProductImageProps {
  fileKey: string; // Tên file (Key) của ảnh trên S3
}

const FetchProductImage: React.FC<FetchProductImageProps> = ({ fileKey }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresignedUrl = async () => {
      try {
        const response = await fetch(`/api/s3-get-presigned?key=${fileKey}`);
        const data = await response.json();

        if (data.url) {
          setImageUrl(data.url);
        } else {
          console.error('Failed to get presigned URL');
        }
      } catch (error) {
        console.error('Error fetching presigned URL:', error);
      }
    };

    fetchPresignedUrl();
  }, [fileKey]);

  if (!imageUrl) {
    return <p>Loading image...</p>;
  }

  return <img src={imageUrl} alt="Product" className="w-64 h-64 object-cover rounded" />;
};

export default FetchProductImage;
