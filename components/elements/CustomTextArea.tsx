import React from 'react';

interface CustomTextAreaProps {
  label: string;
  id: string;
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
  placeholder = "Say hi...",
  rows = 3,
  value,
  onChange,
  className = "",
  disabled = false,
}) => {
  return (
    <div className="mt-5">
      <label
        htmlFor={id}
        className="block text-md font-medium mb-2"
      >
        {label}
      </label>
      <textarea
        id={id}
        className={`py-3 px-4 border block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none ${className}`}
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
