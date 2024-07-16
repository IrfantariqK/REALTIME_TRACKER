// components/AuthButton.tsx
import React from "react";
import { signIn } from "next-auth/react";
import { FaFacebook, FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";

interface AuthButtonProps {
  provider: "google" | "facebook" | "apple";
}

const AuthButton: React.FC<AuthButtonProps> = ({ provider }) => {
  const getButtonClasses = () => {
    return "w-full py-2 mb-4 flex items-center justify-center rounded-md hover:bg-gray-200 text-center ";
  };

  const getIcon = (provider: AuthButtonProps["provider"]) => {
    switch (provider) {
      case "google":
        return <FaGoogle className="inline-block mr-2 text-red-600" />;
      case "facebook":
        return <FaFacebook className="inline-block mr-2 text-blue-600" />;
      case "apple":
        return <FaApple className="inline-block mr-2 text-black" />;
      default:
        return null;
    }
  };

  const getButtonText = (provider: AuthButtonProps["provider"]) => {
    switch (provider) {
      case "google":
        return <>{getIcon(provider)} Continue with Google</>;
      case "facebook":
        return <>{getIcon(provider)} Continue with Facebook</>;
      case "apple":
        return <>{getIcon(provider)} Continue with Apple</>;
      default:
        return `Continue with ${provider}`;
    }
  };

  return (
    <button
      onClick={() => signIn(provider)}
      className={`${getButtonClasses()} text-black bg-gray-100 hover:bg-gray-200 `}
    >
      {getButtonText(provider)}
    </button>
  );
};

export default AuthButton;
