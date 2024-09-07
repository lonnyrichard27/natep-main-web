import React from 'react';

interface CustomTextAreaProps {
  label: string;
  id?: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  disabled?: boolean;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  id,
  placeholder = 'Say hi...',
  rows = 3,
  value,
  onChange,
  className = '',
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium text-[#344054]'>
        {label}
      </label>
      <textarea
        id={id}
        className={`mt-1.5 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 ${className}`}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      ></textarea>
    </div>
  );
};

export default CustomTextArea;
