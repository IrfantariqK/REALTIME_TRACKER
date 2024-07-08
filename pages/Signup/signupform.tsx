/* eslint-disable react/no-unescaped-entities */
import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField"; 
import TogglePassword from "@/components/TogglePassword"; 
import ErrorAlert from "@/components/ErrorAlert"; 
import Link from "next/link";

const Signupform = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

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

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError("Password is required.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegistration = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailValid: boolean = validateEmail(email);
    const isPasswordValid: boolean = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      console.log("Email:", email);
      console.log("Password:", password);
      // Example: Call your registration API or perform registration logic
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleRegistration}>
        <InputField
          type="email"
          placeholder="Email address"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <ErrorAlert message={emailError} />}
        <TogglePassword value={password} onChange={handlePasswordChange} />
        {passwordError && <ErrorAlert message={passwordError} />}
        <Button type="submit">Sign up</Button>{" "}
        {/* Use type="submit" to trigger form submission */}
      </form>
      <div className="text-center mt-4 animate-bounce">
        <p className="text-sm">
          Already account?{" "}
          <Link href="/" legacyBehavior>
            <a className="text-blue-500 hover:underline">Login</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signupform;
