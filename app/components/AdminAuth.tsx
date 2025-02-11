"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Hàm hash key bằng SHA-256
async function hashKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra hash key từ localStorage
    const storedHash = localStorage.getItem('adminHash');
    if (storedHash === process.env.NEXT_PUBLIC_ADMIN_HASH) {
      setAuthorized(true);  // Nếu hash khớp, cho phép truy cập
    }
  }, []);

  const handleKeySubmit = async () => {
    const hashedInput = await hashKey(inputKey);
    if (hashedInput === process.env.NEXT_PUBLIC_ADMIN_HASH) {
      localStorage.setItem('adminHash', hashedInput);  // Lưu hash vào localStorage
      setAuthorized(true);
    } else {
      alert('Sai Admin Key. Vui lòng thử lại!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminHash');  // Xóa hash khỏi localStorage
    setAuthorized(false);  // Về lại trạng thái chưa đăng nhập
    router.push('/');  // Điều hướng về trang chính hoặc form đăng nhập
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded">
          <h1 className="text-2xl font-bold mb-4">Nhập Admin Key</h1>
          <input
            type="password"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Nhập Admin Key"
            className="border w-full p-2 rounded mb-4"
          />
          <button
            onClick={handleKeySubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header với nút logout */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* Nội dung trang */}
      <main className="p-4">{children}</main>
    </>
  );
};

export default AdminAuth;
