import { NextResponse } from 'next/server';
import s3 from '../../../lib/s3';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get('key');  // File name của ảnh, ví dụ: "hoalan1.jpg"

  if (!key) {
    console.error('Missing file key');
    return NextResponse.json({ error: 'Missing file key' }, { status: 400 });
  }

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    Expires: 86400 * 7,  // Pre-signed URL có hiệu lực trong 7 ngày (86400 giây * 7)
  };

  try {
    const presignedUrl = await s3.getSignedUrlPromise('getObject', params);
    return NextResponse.json({ url: presignedUrl });
  } catch (error) {
    console.error('Failed to generate Pre-signed URL:', error);
    return NextResponse.json({ error: 'Failed to generate Pre-signed URL' }, { status: 500 });
  }
}
``
