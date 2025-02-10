import './globals.css'; // CSS chung
import { ReactNode } from 'react';
import Header from './components/Header'; // Import Header một lần

export const metadata = {
  title: 'Quế Thanh Garden',
  description: 'Vườn hoa lan tuyệt đẹp',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header /> {/* Header luôn hiển thị trên mọi trang */}
        <main>{children}</main> {/* Nội dung của mỗi trang */}
      </body>
    </html>
  );
};

export default RootLayout;
