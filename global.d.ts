import { MongoClient } from 'mongodb';

declare global {
  // Thêm thuộc tính _mongoClientPromise vào global
  var _mongoClientPromise: Promise<MongoClient>;
}
