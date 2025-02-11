import { NextResponse } from 'next/server';
import s3 from '@/lib/s3';
import clientPromise from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const file = formData.get('file') as File;

    if (!name || !price || !file) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Đọc nội dung file và chuyển thành Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);  // Chuyển ArrayBuffer thành Buffer

    // Tạo unique key cho file
    const fileKey = `products/${uuidv4()}_${file.name}`;

    // Upload ảnh lên S3
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileKey,
      Body: buffer,
      ContentType: file.type,
    };

    const s3Response = await s3.upload(uploadParams).promise();
    const imageUrl = s3Response.Location;
    // Tạo Presigned URL cho ảnh vừa upload
    const presignedUrl = s3.getSignedUrl('getObject', {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileKey,
      Expires: 60 * 60 * 24 * 30,  // Presigned URL hết hạn sau 30 ngày
    });

    // Lưu vào MongoDB
    const client = await clientPromise;
    const db = client.db('quethanh');
    await db.collection('products').insertOne({ name, price, image: fileKey, imageURL: presignedUrl });

    return NextResponse.json({ message: 'Upload thành công!', imageUrl });
  } catch (error) {
    console.error('Error uploading product:', error);
    return NextResponse.json({ error: 'Failed to upload product' }, { status: 500 });
  }
};
