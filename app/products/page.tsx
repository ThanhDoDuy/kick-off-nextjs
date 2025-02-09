import clientPromise from '../../lib/mongodb';
import ProductCard from './ProductCard';

interface Product {
  name: string;
  price: number;
  image: string;
  imageURL: string;
}

const ProductsPage = async () => {
  const client = await clientPromise;
  const db = client.db('quethanh');

  const products = (await db.collection('products').find({}).toArray()).map((product) => ({
    name: product.name,
    price: product.price,
    image: product.image,
    imageURL: product.imageURL
  })) as Product[];

  return (
    <section className="px-8 py-16 md:px-16 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Sản Phẩm Của Chúng Tôi</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
