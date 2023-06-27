
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';

import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from 'axios';

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate(); // useNavigate hook for navigation
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('http://localhost:3333/auth/signin', data);
      console.log(response.data);
      const access_token = response.data.access_token;
      localStorage.setItem('access_token', access_token);
      navigate('/user');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log(axiosError.response.data);
      }
    }
  };

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);

      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [location.state]);

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
          <h2 className='text-4xl dark:text-white font-bold text-center'>LOGIN</h2>
          {successMessage && (
            <p className='text-green-500 text-center'>{successMessage}</p>
          )}
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
              {...register('password', { required: 'Password is required' })}
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
            LOGIN
          </button>
          <p className='text-center text-gray-400'>
            Don't have an account? <Link to='/'>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}



