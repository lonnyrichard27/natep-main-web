import { dropdownIcon } from '@/util/DropdownIcon';
import React, { ReactNode } from 'react';
import Select from 'react-select';

export interface DropdownTypes {
  label: string;
  value: string | number | ReactNode;
}

interface SelectDropdownTypes {
  defaultValue?: any;
  label?: string;
  labelClassName?: string;
  onChange?: any;
  styles?: string | any;
  disabled?: boolean;
  options: { value: string | number; label: string }[];
  multiSelect?: any;
  textTransform?: string;
  error?: string | undefined;
  icon?: number;
  leftIcon?: ReactNode;
  placeholder?: string;
  required?: boolean;
}

const SelectDropdown = React.forwardRef(function SelectDropdown(
  {
    label,
    labelClassName,
    defaultValue,
    onChange,
    styles,
    disabled,
    options,
    multiSelect,
    textTransform,
    error,
    icon,
    leftIcon,
    placeholder,
    required,
    ...rest
  }: SelectDropdownTypes,
  ref
) {
  // select dropdown custom styles
  const selectCustomStyles = {
    menu: (provided: any) => ({
      ...provided,
      fontSize: '14px',
      textTransform: textTransform || 'capitalize',
      zIndex: 100,
    }),

    placeholder: (provided: any) => ({
      ...provided,
      color: '#bdbdbd',
      fontSize: '14px',
    }),

    control: (provided: any, state: { isFocused: any }) => ({
      ...provided,
      paddingLeft: leftIcon ? '32px' : 'auto',
      minHeight: '45px',
      fontSize: '14px !important',
      border: `1px solid ${state.isFocused ? '#28A745' : '#E6E6E6'}`,
      color: '#E7EDF2',
      borderRadius: '4px',
      textTransform: textTransform || 'capitalize',
    }),

    option: (provided: any, state: { isSelected: any; isFocused: any }) => ({
      ...provided,
      zIndex: 100,
      fontSize: '14px',
      backgroundColor: state.isSelected
        ? '#002366'
        : state.isFocused
          ? '#e6e9f0'
          : '',
    }),

    singleValue: (provided: any, state: { isDisabled: any }) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  return (
    <div className='w-full'>
      {label && (
        <div className='mb-1 flex items-center gap-0.5'>
          <label
            className={`${
              labelClassName || 'text-[#2D3748]'
            } text-left text-sm`}
          >
            {label}
          </label>

          {required && <span className='text-red-500'>*</span>}
        </div>
      )}

      {multiSelect ? (
        <div className='flex w-full items-center gap-2'>
          {leftIcon && (
            <div className='text-dark absolute left-3 top-1/2 z-50 -translate-y-[50%] text-lg'>
              {leftIcon}
            </div>
          )}
          <div className='flex-1'>
            <Select
              isClearable
              isMulti
              components={{
                DropdownIndicator: () => (
                  <span className='pr-4'>{dropdownIcon(icon || 1)}</span>
                ),
                IndicatorSeparator: () => null,
              }}
              isDisabled={disabled}
              defaultValue={defaultValue}
              onChange={onChange}
              styles={styles || selectCustomStyles}
              options={options}
              {...rest}
            />
          </div>
        </div>
      ) : (
        <div className='relative flex w-full items-center gap-2'>
          {leftIcon && (
            <div className='text-dark absolute left-3 top-1/2 z-50 -translate-y-[50%] text-lg'>
              {leftIcon}
            </div>
          )}
          <div className='relative flex-1'>
            <Select
              isClearable
              components={{
                DropdownIndicator: () => (
                  <span className='pr-4'>{dropdownIcon(icon || 1)}</span>
                ),
                IndicatorSeparator: () => null,
              }}
              placeholder={placeholder || options?.[0]?.label}
              isDisabled={disabled}
              defaultValue={defaultValue}
              onChange={onChange}
              styles={styles || selectCustomStyles}
              options={options}
              {...rest}
            />
          </div>
        </div>
      )}

      {error && <div className='ml-1 mt-2 text-xsm text-red-500'>{error}</div>}
    </div>
  );
});

export default SelectDropdown;
