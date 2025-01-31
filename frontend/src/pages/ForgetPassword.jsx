import React, { useState } from 'react';
import useForgetPassword from '../hooks/useForgetPassword.js';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const [regNo, setRegNo] = useState('');
  const { loading, forgetPassword } = useForgetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgetPassword(regNo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Forgot Password?
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your registration number to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input for Registration Number */}
          <div>
            <label htmlFor="reg_no" className="block text-sm font-medium text-gray-700">
              Registration Number
            </label>
            <input
              type="text"
              id="reg_no"
              name="reg_no"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your registration number"
              required
            />
          </div>

        <Link to='/login' className='hover:to-blue-700'>Login</Link>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
