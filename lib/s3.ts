import AWS from 'aws-sdk';

// Khởi tạo S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // Region của bucket, ví dụ: ap-southeast-1
});

export default s3;
