import { NextApiRequest, NextApiResponse } from 'next';
import { S3 } from 'aws-sdk';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ error: 'Missing key parameter' });
  }

  try {
    const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key as string,
      Expires: 86400, // 1 day
    });

    return res.status(200).json({ url });
  } catch (error) {
    console.error('Error generating Pre-signed URL:', error);
    return res.status(500).json({ error: 'Failed to generate Pre-signed URL' });
  }
}
