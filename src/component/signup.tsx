import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import axios from 'axios';

const baseURL = "http://localhost:3333/auth/signup";


type FormData = {
  email: string;
  password: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate(); // useNavigate hook for navigation

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(baseURL, data);
      console.log(response.data);
      const access_token = response.data.access_token;
      localStorage.setItem("access_token", access_token);
      navigate('/login', { state: { successMessage: 'You have successfully signed up!' } });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log(axiosError.response.data);
      }
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src='./images/login.jpg' alt='' />
      </div>

      <div className='bg-gray-800 flex flex-col justify-center'>
        <form
          className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className='text-4xl dark:text-white font-bold text-center'>SIGN UP</h2>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Email</label>
            <input
              className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              type='email'
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Password</label>
            <input
              className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              type='password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 4,
                  message: 'Password must be at least 4 characters long',
                },
                pattern: {
                  value: /^(?=.*[!@#$%^&*])/,
                  message: 'Password must contain a special character',
                },
              })}
            />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>
          <div className='flex justify-between text-gray-400 py-2'>
            <p className='flex items-center'>
              <input className='mr-2' type='checkbox' />
              Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <button
            className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
            type='submit'
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}


