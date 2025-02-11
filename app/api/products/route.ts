import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db('quethanh');

    // Fetch products từ MongoDB
    const products = await db.collection('products').find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
};
