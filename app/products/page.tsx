import clientPromise from '../../lib/mongodb';

interface Product {
  name: string;
  price: number;
  image: string;
}

const ProductsPage = async () => {
  const client = await clientPromise;
  const db = client.db('quethanh');
  
  // Fetch dữ liệu và khẳng định với TypeScript
  const products = (await db.collection('products').find({}).toArray()).map((product) => ({
    name: product.name,
    price: product.price,
    image: product.image,
  })) as Product[];
  
  return (
    <section className="px-8 py-16 md:px-16">
      <h1 className="text-4xl font-bold text-center mb-8">Sản Phẩm Của Chúng Tôi</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.name} className="border rounded-lg p-4 shadow-md hover:shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="mt-4 text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
