'use client'
import axios from 'axios';
import React, { useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import Loader from './Loader';
import User from '../../models/userModel';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    setError('');
    try {
      await User.login(username, password);
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed: ' + (err.message || 'Network or server issue'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ backgroundImage: 'url("/bg_img.jpg")' ,backgroundSize:"cover"}} className="flex items-center justify-center min-h-screen bg-gray-700 text-gray-100 ">
      
      <div className="absolute inset-0 bg-gray-700 bg-opacity-30 flex items-center justify-center">
        <div className="w-full max-w-md rounded-lg shadow-lg p-8 bg-[#fce7f3] bg-opacity-50">  
          <h2 className="text-3xl font-bold text-center mb-4 ">
            <span className='text-pink-600'>{"JUPYTER  "}</span>APPARELS
          </h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-black">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 p-2 w-full border border-gray-600 rounded-md focus:outline-none focus:ring-[#db2777] focus:border-[#db2777] text-sm bg-gray-700 text-gray-100"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                aria-required="true"
                aria-describedby="username-error"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="mt-1 p-2 w-full border border-gray-600 rounded-md focus:outline-none focus:ring-[#db2777] focus:border-[#db2777] text-sm bg-gray-700 text-gray-100"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  aria-required="true"
                  aria-describedby="password-error"
                />
                <a href="#" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-pink-600">
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#db2777] border-gray-600 rounded bg-gray-700"
                />
                <span className="ml-2 text-sm text-[#db2777]">Keep me signed in</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#db2777] focus:ring-opacity-50"
            >
              Login
            </button>
          </form>
          <div
            id="error-message"
            className={classNames('mt-4 text-center text-sm text-red-400', { 'hidden': !error })}
            aria-live="assertive"
          >
            {error}
          </div>
          <Loader loading={loading} />
        </div>
      </div>
    </div>
  );
}
