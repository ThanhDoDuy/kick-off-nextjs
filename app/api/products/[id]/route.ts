import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const PATCH = async (req: Request) => {
  try {
    // Lấy id từ URL
    const url = new URL(req.url);
    const productId = url.pathname.split('/').pop();

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: 'Tên sản phẩm không được để trống' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('quethanh');

    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(productId) },
      { $set: { name } }
    );

    if (result.modifiedCount > 0) {
      return NextResponse.json({ message: 'Cập nhật thành công' });
    } else {
      return NextResponse.json({ error: 'Không tìm thấy sản phẩm hoặc không có thay đổi' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    // Lấy id từ URL query
    const url = new URL(req.url);
    const productId = url.pathname.split('/').pop();  // Lấy id từ URL cuối cùng

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('quethanh');

    // Xóa sản phẩm theo _id
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(productId) });

    if (result.deletedCount > 0) {
      return NextResponse.json({ message: 'Xóa sản phẩm thành công' });
    } else {
      return NextResponse.json({ error: 'Không tìm thấy sản phẩm' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
};

