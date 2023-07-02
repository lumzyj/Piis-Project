import './Transfer.css';
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import Sidebar from '../Sidebar/sidebar';
import { useNavigate } from 'react-router-dom';

function Transfer() {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState<number>(0);
  const [accountData, setAccountData] = useState<any>(null);
  const id = localStorage.getItem('id');
  const baseURL = `http://localhost:3333/Accounts/${id}/send-money/:recipientId`;
  const baseURL1 = "http://localhost:3333/Accounts/getAccounts";

  useEffect(() => {
    fetchAccountData();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const balance = Number(formData.get('balance'));
    const accountNumber = Number(formData.get('account_Number'));

    try {
      const recipientId = localStorage.getItem('selectedAccountId');
      const selectedUserId = localStorage.getItem('selectedUserId'); // Get the stored userId
      const endpoint = baseURL.replace(':recipientId', recipientId!);

      const response = await axios.post(
        endpoint,
        { userId: selectedUserId, balance, account_Number: accountNumber },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      console.log(response.data);
      alert('Transfer done successfully');
      navigate('/dashboard');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log(axiosError.response.data);
      }
    }
  };

  const handleRecipientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRecipient = Number(event.target.value);
    const selectedAccount = accountData.find((account: any) => account.account_Number === selectedRecipient);

    if (selectedAccount) {
      const selectedAccountId = selectedAccount.id;
      const selectedUserId = selectedAccount.userId;
      console.log('Selected ID:', selectedAccountId);
      localStorage.setItem('selectedAccountId', selectedAccountId.toString());
      localStorage.setItem('selectedUserId', selectedUserId.toString());
    }

    setRecipient(selectedRecipient);
  };

  const fetchAccountData = async () => {
    try {
      const response = await axios.get(baseURL1);
      setAccountData(response.data);

      // Extract account numbers from the response data and update the dropdown options
      const accountNumbers = response.data.map((account: any) => account.account_Number);
      setRecipient(Number(accountNumbers[0])); // Set the first account number as the initial value
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

        <div className="transfer">
          <h1>Transfer</h1>
          <form className="form" onSubmit={onSubmit}>
            <div className="form__item">
              <label htmlFor="from" className="label">
                Transfer from:
              </label>
              <select id="from" name="account_Number" className="input" value={recipient} onChange={handleRecipientChange}>
                {accountData && accountData.map((account: any) => (
                  <option key={account.id} value={account.account_Number}>
                    {account.account_Number}
                  </option>
                ))}
              </select>
            </div>
            <div className="form__item">
              <label htmlFor="to" className="label">
                Transfer to:
              </label>
              <input
                type="number"
                min={100000}
                max={999999}
                id="to"
                name="to"
                className="input"
                placeholder="Account Number"
              />
            </div>
            <div className="form__item">
              <label htmlFor="amount" className="label">
                Enter Amount:
              </label>
              <input
                type="number"
                min={1}
                id="balance"
                name="balance"
                className="input"
                placeholder="Amount"
              />
            </div>
            <div className="form__item">
              <button type="submit" className="submit">
                Transfer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Transfer;




