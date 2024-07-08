"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField"; 
import ErrorAlert from "@/components/ErrorAlert"; 
import Head from "next/head";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError("Email is required.");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateEmail(email)) {
      // Simulate sending reset password email (replace with actual API call)
      setTimeout(() => {
        setSuccessMessage(`Password reset link sent to ${email}.`);
        setEmail("");
      }, 1000); // Example: Replace with actual API call and handle response
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-md">
      <Head>
        <title>Forget password</title>
      </Head>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-5">
        Forgot Password
      </h2>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <ErrorAlert message={emailError} />}
        <Button type="submit">Send Reset Link</Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
