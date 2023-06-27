import React from "react";
import Sidebar from "./Sidebar/sidebar";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

const baseURL = "http://localhost:3333/Accounts/addAccount";

type FormData = {
  AccountName: string;
  account_Number: number;
  pin: number;
  balance: number;
};

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      // Get the user's token from wherever it is stored (e.g., localStorage)
      const access_token = localStorage.getItem('access_token');

      // Convert pin and balance to numbers
      const requestData = {
        ...data,
        pin: Number(data.pin),
        balance: Number(data.balance),
        account_Number: Number(data.account_Number),
        AccountName: String(data.AccountName),
      };

      const response = await axios.post(baseURL, requestData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log(response.data);
      const id = response.data.id;
      localStorage.setItem("id", id);

      navigate('/dashboard');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log(axiosError.response.data);
      }
    }
  };

  return (
    <div className="Blackp">
      <div className="framy">
        <Sidebar />
        <div className="create__user">
          <h1>Create Account</h1>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__item">
              <label className="label" htmlFor="accountName">
                Enter Full Name:
              </label>
              <input
                type="text"
                className="input"
                placeholder="Full Name"
                {...register('AccountName', { required: 'Full name is required' })}
              />
              {errors.AccountName && <p className='text-red-500'>Full name is required</p>}
            </div>
            <div className="form__item">
              <label htmlFor="accountNo" className="label">
                Enter Account Number:
              </label>
              <input
                type="number"
                className="input"
                min={100000}
                max={999999}
                placeholder="6-digit Account Number"
                {...register('account_Number', { required: 'Account number is required' })}
              />
              {errors.account_Number && <p className='text-red-500'>Account number is required</p>}
            </div>
            <div className="form__item">
              <label htmlFor="balance" className="label">
                Enter Balance:
              </label>
              <input
                type="number"
                
                className="input"
                min={0}
                placeholder="Enter Balance"
                {...register('balance', { required: 'Balance is required' })}
              />
              {errors.balance && <p className='text-red-500'>Balance is required</p>}
            </div>
            <div className="form__item">
              <label htmlFor="pin" className="label">
                Enter PIN:
              </label>
              <input
                type="password"
                className="input"
                placeholder="Enter PIN"
                {...register('pin', {
                  required: 'PIN is required',
                  minLength: {
                    value: 4,
                    message: 'PIN must be at least 4 characters long',
                  },
                })}
              />
              {errors.pin && <p className='text-red-500'>{errors.pin.message}</p>}
            </div>
            <div className="form__item">
              <button className="submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}








