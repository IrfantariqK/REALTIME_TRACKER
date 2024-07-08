import React, { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; // Define type prop with valid values
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = "button",
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none animate-bounce"
    >
      {children}
    </button>
  );
};

export default Button;
