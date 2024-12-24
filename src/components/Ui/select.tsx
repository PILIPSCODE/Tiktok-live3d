import React, { useState } from 'react';
import Input from './input';

interface CustomSelectProps<T> {
  placeholder: string;
  inputSize?: string;
  className?: string;
  defaultValue?: string;
  options: T[];
  displayKey: keyof T;
  onSelect: (option: T) => void;
}

const CustomSelect = <T,>({
  placeholder,
  className = '',
  options,
  defaultValue,
  displayKey,
  onSelect,
}: CustomSelectProps<T>) => {
  const [input, setInput] = useState(defaultValue || "");
  const [show, setShow] = useState(false);

  const handleClickOption = (option: T) => {
    setInput(option[displayKey] as string);
    setShow(false);
    onSelect(option);
  };
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Delay closing to allow click event to register
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setTimeout(() => setShow(false), 100);
    }
  };

  return (
    <div
      onBlur={handleBlur}
      className={`w-full ${show ? "mb-36" : ""} duration-200 relative ${className}`}>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setShow(true)}
        Inputsize={"sm"}
        className={`w-full`}
      />
      <div
        className={`${show ? 'h-32 opacity-100' : 'h-0 opacity-0'
          } w-full mt-2 p-2 bg-white border overflow-y-scroll  duration-300 absolute z-50`}
      >
        {options
          .filter((option: any) =>
            (option[displayKey] as string).toLowerCase().includes(input.toLowerCase())
          )
          .sort((a, b) =>
            (a[displayKey] as string).localeCompare(b[displayKey] as string)
          )
          .map((option, index) => (
            <div
              onClick={() => handleClickOption(option)}
              key={index}
              className="cursor-pointer hover:bg-gray-100 p-2"
            >
              {option[displayKey] as string}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomSelect;
