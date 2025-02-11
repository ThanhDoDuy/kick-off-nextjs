"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminAuth from '@/app/components/AdminAuth';

const UploadProductPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const router = useRouter();  // Khởi tạo router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !image) {
      alert('Vui lòng điền đầy đủ thông tin và chọn ảnh.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('file', image);

    try {
      const res = await fetch('/api/products/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Upload thành công!');

        // Điều hướng về trang /products sau 1 giây (nếu cần delay)
        setTimeout(() => {
          router.push('/products');
        }, 1000);
      } else {
        setMessage(`Lỗi: ${data.error}`);
      }
    } catch (error) {
      console.error('Error uploading product:', error);
      setMessage('Lỗi: Không thể kết nối đến server.');
    }
  };

  return (
    <AdminAuth>
      <section className="px-8 py-16 md:px-16">
        <h1 className="text-3xl font-bold mb-8">Upload sản phẩm mới</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-semibold">Tên sản phẩm:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold">Giá:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold">Chọn ảnh:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded">
            Upload sản phẩm
          </button>
        </form>
        {message && <p className="mt-4 text-lg">{message}</p>}
      </section>
    </AdminAuth>
  );
};

export default UploadProductPage;
