const crypto = require('crypto');
const key = "quethanh123@";
const hash = crypto.createHash('sha256').update(key).digest('hex');
console.log('Admin Hash:', hash);
