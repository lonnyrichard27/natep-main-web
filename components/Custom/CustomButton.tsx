import React from 'react';

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  bgColor?: string;
  color?: string;
  icon?: React.ReactNode; 
  iconPosition?: 'left' | 'right'; 
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  className = '',
  bgColor = 'bg-primary',
  color = 'text-white',
  icon,
  iconPosition = 'left', 
}) => {
  return (
    <button
      className={`${bgColor} ${color} px-6 py-2 rounded-full focus:outline-none flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span> 
      )}
      {text}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default CustomButton;
