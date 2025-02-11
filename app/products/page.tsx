"use client"; // Thêm dòng này để chuyển thành client component

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  imageURL: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <section className="px-8 py-16 md:px-16 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Sản Phẩm Của Chúng Tôi</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
