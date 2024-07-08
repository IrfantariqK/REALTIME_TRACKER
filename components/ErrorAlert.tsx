// ErrorAlert.tsx
import React from "react";

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-pulse">
      {message}
    </div>
  );
};

export default ErrorAlert;
