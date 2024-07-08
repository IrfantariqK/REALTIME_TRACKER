/* eslint-disable jsx-a11y/alt-text */
"use client";
import AuthButton from "@/components/AuthButton";
import LoginForm from "./login_form";
import Head from "next/head";
import Video from "@/components/Video";

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <Head>
        <title>Realtime Tracker</title>
      </Head>
      {/* Left side: Login Form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full p-8 space-y-4 rounded-md">
          <h2 className="text-3xl font-bold text-center mb-5 animate-bounce">
            Login To Realtime Tracker
          </h2>
          {/* authentication buttons */}
          <AuthButton provider="Google" />
          <AuthButton provider="facebook" />
          <AuthButton provider="Apple" />
          {/* Render the login form */}
          <LoginForm />
        </div>
      </div>

      {/* Right side: Image (optional) */}
      <div className="hidden md:flex-1 md:flex md:items-center md:justify-center ">
        <Video />
      </div>
    </div>
  );
};

export default Login;
