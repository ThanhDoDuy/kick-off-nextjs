"use client";

import AdminAuth from '@/app/components/AdminAuth';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  imageURL: string;
}

const AdminUpdatePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editedProducts, setEditedProducts] = useState<{ [key: string]: string }>({});

  // Fetch all products from Next.js API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (productId: string, newName: string) => {
    setEditedProducts((prev) => ({ ...prev, [productId]: newName }));
  };

  const handleUpdate = async (productId: string) => {
    const newName = editedProducts[productId];
    if (!newName) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        alert('Cập nhật tên sản phẩm thành công!');
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, name: newName } : product
          )
        );
        setEditedProducts((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          return updated;
        });
      } else {
        alert('Lỗi khi cập nhật tên sản phẩm');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Xóa sản phẩm thành công!');
        setProducts((prevProducts) => prevProducts.filter((p) => p._id !== productId));
      } else {
        alert('Lỗi khi xóa sản phẩm');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return <p className="text-center">Đang tải danh sách sản phẩm...</p>;
  }

  return (
    <AdminAuth>
      <section className="px-8 py-16 md:px-16">
        <h1 className="text-3xl font-bold mb-8">Quản Lý Sản Phẩm</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="p-4 border">Hình Ảnh</th>
              <th className="p-4 border">Tên Sản Phẩm</th>
              <th className="p-4 border">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-4">
                  <Image
                    src={product.imageURL}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="text"
                    defaultValue={product.name}
                    className="border p-2 rounded w-full"
                    onChange={(e) => handleInputChange(product._id, e.target.value)}
                  />
                </td>
                <td className="p-4 flex items-center space-x-4">
                  <button
                    onClick={() => handleUpdate(product._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    disabled={!editedProducts[product._id]} // Chỉ cho phép update khi có thay đổi
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AdminAuth>
  );
};

export default AdminUpdatePage;
