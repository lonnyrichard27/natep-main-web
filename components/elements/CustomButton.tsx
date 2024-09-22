import React from 'react';

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  bgColor?: string;
  color?: string;
  hoverBgColor?: string;
  activeBgColor?: string;
  disabledBgColor?: string;
  disabledTextColor?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  className = '',
  bgColor = 'bg-primary',
  color = 'text-white',
  hoverBgColor = 'hover:bg-primary-dark',
  activeBgColor = 'active:bg-primary-darker',
  disabledBgColor = 'bg-gray-400',
  disabledTextColor = 'text-gray-200',
  icon,
  iconPosition = 'left',
  type = 'button',
  ariaLabel,
  disabled = false,
  loading = false
}) => {
  return (
    <button
      type={type}
      className={`${disabled ? `${disabledBgColor} ${disabledTextColor}` : `${bgColor} ${color} ${hoverBgColor} ${activeBgColor}`} px-6 py-2 rounded-full focus:outline-none flex items-center justify-center ${className}`}
      onClick={disabled ? undefined : onClick}
      aria-label={ariaLabel || text}
      disabled={disabled || loading}

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
