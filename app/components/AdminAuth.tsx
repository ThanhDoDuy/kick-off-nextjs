"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra key từ localStorage
    const storedKey = localStorage.getItem('adminKey');
    if (storedKey === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      setAuthorized(true);  // Nếu key đúng, cho phép truy cập
    }
  }, []);

  const handleKeySubmit = () => {
    if (inputKey === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      localStorage.setItem('adminKey', inputKey);  // Lưu key vào localStorage
      setAuthorized(true);
    } else {
      alert('Sai Admin Key. Vui lòng thử lại!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminKey');  // Xóa key khỏi localStorage
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
