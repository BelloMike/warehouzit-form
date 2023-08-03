"use client";

import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    lastName: '',
    phoneNumber: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginForm) {
      // Login form validation
      if (!formData.email.trim()) {
        alert('Please enter your email address');
        return;
      }
      if (!formData.password.trim()) {
        alert('Please enter your password');
        return;
      }

      // API call for login
      try {
        const response = await axios.post(
          'https://warehouzitserver.onrender.com/api/v1/auth/login',
          formData
        );
        console.log('Login success:', response.data);
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    } else {
      // Register form validation
      if (!formData.fullName.trim()) {
        alert('Please enter your full name');
        return;
      }
      if (!formData.lastName.trim()) {
        alert('Please enter your last name');
        return;
      }
      if (!formData.email.trim()) {
        alert('Please enter your email address');
        return;
      }
      if (!formData.phoneNumber.trim()) {
        alert('Please enter your phone number');
        return;
      }
      if (!formData.password.trim()) {
        alert('Please choose a password');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      // API call for registration
      try {
        const response = await axios.post(
          'https://warehouzitserver.onrender.com/api/v1/auth/register',
          formData
        );
        console.log('Registration success:', response.data);
      } catch (error) {
        console.error('Registration failed:', error.message);
      }
    }
  };

  const toggleForm = () => {
    setIsLoginForm((prevIsLoginForm) => !prevIsLoginForm);
  };

  const toggleWelcomeMessage = () => {
    setShowWelcomeMessage(false);
  };

  return (
    <div>
      <Head>
        <title>Login/Register Form</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        {showWelcomeMessage && (
          <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
            <div className="bg-green-800 px-4 py-2 mb-10 flex items-center justify-between">
              <p className="text-white">Hello, Welcome</p>
              <p
                className="text-white px-4 py-2 rounded cursor-pointer"
                onClick={toggleWelcomeMessage}
              >
                X
              </p>
            </div>
            <div className="mb-4 flex justify-start items-center">
              <span
                className={`text-green-800 cursor-pointer ${
                  isLoginForm ? 'font-bold' : ''
                }`}
                onClick={toggleForm}
              >
                Login
              </span>
              <span className="mx-2 text-green-400">|</span>
              <span
                className={`text-green-800 cursor-pointer ${
                  !isLoginForm ? 'font-bold' : ''
                }`}
                onClick={toggleForm}
              >
                Register
              </span>
            </div>

            <hr className="mb-4 border-t border-green-300" />

            <form onSubmit={handleSubmit}>
              {isLoginForm ? (
                <fieldset>
                  <div className="mb-4">
                    <input
                      type="email"
                      id="email"
                      required
                      className="input w-full py-2 px-4"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="password"
                      id="password"
                      required
                      className="input w-full py-2 px-4"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <label htmlFor="rememberMe" className="text-green-700">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        className="mr-2 leading-tight"
                      />
                      Remember me
                    </label>
                    <a href="#" className="text-green-700">
                      Forget password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="button w-full bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none"
                  >
                    Login
                  </button>
                </fieldset>
              ) : (
                <fieldset>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="fullName"
                      required
                      className="input w-full py-2 px-4"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="input w-full py-2 px-4"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="email"
                      id="email"
                      required
                      className="input w-full py-2 px-4"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="tel"
                      id="phoneNumber"
                      required
                      className="input w-full py-2 px-4"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="password"
                      id="password"
                      required
                      className="input w-full py-2 px-4"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="password"
                      id="confirmPassword"
                      required
                      className="input w-full py-2 px-4"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <label htmlFor="rememberMe" className="text-green-700">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        className="mr-2 leading-tight"
                      />
                      Remember me
                    </label>
                    <a href="#" className="text-green-700">
                      Forget password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="button w-full bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none"
                  >
                    Register
                  </button>
                </fieldset>
              )}
            </form>

            <hr className="my-4 border-t border-green-300 mx-auto w-1/2" />

          </div>
        )}
      </div>
    </div>
  );
}
