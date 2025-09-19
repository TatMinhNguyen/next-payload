import React from 'react';

// Định nghĩa các props mà Button component sẽ nhận
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'navy' | 'outline' | "green" | "sky";
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary', // Giá trị mặc định là 'primary'
  size = 'md', // Giá trị mặc định là 'md'
  className = '',
  ...props // Nhận các props khác của button như onClick, type, disabled...
}) => {
  // Các class CSS cơ bản cho mọi button
  const baseStyles = 'inline-flex items-center justify-center cursor-pointer rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  // Các class CSS cho từng loại (variant) button
  const variantStyles = {
    primary: 'font-semibold bg-[#E7E5FF] text-[#3A18CE] hover:bg-[#3A18EE] hover:text-white',
    secondary: 'font-semibold bg-gray-500 text-white hover:bg-gray-600',
    danger: 'font-semibold bg-red-600 text-white hover:bg-red-700',
    ghost: 'font-normal bg-transparent text-black hover:bg-[#E7E5FF]',
    navy: 'font-semibold bg-[#3A18CE] text-white hover:bg-[#3A18EE] focus:outline-none focus:bg-[#3A18CE]',
    outline: 'font-semibold border border-gray-300 text-gray-800 hover:bg-gray-100',
    green: 'font-semibold bg-[#26D06D] text-white hover:bg-green-600 focus:outline-none focus:bg-green-600',
    sky: 'font-semibold bg-[#36A6FF] text-white hover:bg-blue-500 focus:outline-none focus:bg-blue-500',
  };

  // Các class CSS cho từng kích thước (size)
  const sizeStyles = {
    sm: 'px-4 py-1.5',
    md: 'px-6 py-2',
    lg: 'px-8 py-3',
  };

  // Kết hợp các class lại với nhau
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={combinedClassName.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;
