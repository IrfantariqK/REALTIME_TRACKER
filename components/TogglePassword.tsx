"use client";
import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri"; // Importing eye icons from react-icons

interface TogglePasswordProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TogglePassword: React.FC<TogglePasswordProps> = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-3 flex items-center px-3 focus:outline-none"
      >
        {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
      </button>
    </div>
  );
};

export default TogglePassword;
