import { NextResponse } from 'next/server';
import { S3 } from 'aws-sdk';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';  // Import ObjectId để chuyển đổi productId

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const GET = async (req: Request) => {
  try {
    // Lấy productId từ URL query
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Chuyển đổi productId từ string thành ObjectId
    const objectId = new ObjectId(productId);

    // Kết nối tới MongoDB để lấy thông tin sản phẩm
    const client = await clientPromise;
    const db = client.db('quethanh');
    const product = await db.collection('products').findOne({ _id: objectId });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Tạo Presigned URL mới
    const newPresignedUrl = s3.getSignedUrl('getObject', {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: product.image,
      Expires: 60 * 60 * 24 * 7,  // Presigned URL mới có hiệu lực trong 7 ngày
    });

    // Cập nhật Presigned URL mới trong MongoDB
    await db.collection('products').updateOne(
      { _id: objectId },  // Dùng ObjectId thay vì string
      { $set: { imageURL: newPresignedUrl } }
    );

    return NextResponse.json({ newImageURL: newPresignedUrl });
  } catch (error) {
    console.error('Error generating new presigned URL:', error);
    return NextResponse.json({ error: 'Failed to generate new presigned URL' }, { status: 500 });
  }
};
