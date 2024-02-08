import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(""); // State to store error message

  //  Method to handle form submission
  const login = async (data) => {
    setError(""); // Firstly empty out the error state to remove any previous error

    try {
      const session = await authService.login(data); // Call the login method from authService
      // If session is available then dispatch the login action
      if (session) {
        const userData = await authService.getCurrentUser(); // Get the current user data
        // If user data is available then dispatch the login action
        if (userData) {
          dispatch(authLogin(userData)); // Dispatch the login action to the store
          // After login, navigate to the home
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message); // Set the error message
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {
          // Error message
          error && <p className="text-red-600 mt-8 text-center">{error}</p>
        }
      </div>
    </div>
  );
}

export default Login;
