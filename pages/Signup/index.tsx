/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";
import SignupForm from "./signupform";
import AuthButton from "@/components/AuthButton";
import Head from "next/head";
import Video from "@/components/Video";

const Signup: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <Head>
        <title>Realtime Tracker Signup</title>
      </Head>
      {/* Left side: Registration Form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full p-8 space-y-4 rounded-md">
          <h2 className="text-3xl font-bold text-center mb-5 animate-bounce">
            Create an Account
          </h2>
          {/* Social authentication buttons */}
          <AuthButton provider="google" />
          <AuthButton provider="facebook" />
          <AuthButton provider="apple" />
          {/* Render the registration form */}
          <SignupForm />
        </div>
      </div>

      {/* Right side: Image (optional) */}
      <div className="hidden md:flex-1 md:flex md:items-center md:justify-center">
        <Video />
      </div>
    </div>
  );
};

export default Signup;
