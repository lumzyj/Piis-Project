import React, { FormEvent } from 'react';
import './Transfer.css';
import Sidebar from '../Sidebar/sidebar';

function Transfer() {
  return (
<div className="Blackp">
    <div className ="framy">
      <Sidebar/>
           
            <div className ="transfer">
                <h1>Transfer</h1>
                <form className="form">
                    <div className="form__item">
                    <label htmlFor="from" className="label">
                        Transfer from:
                    </label>
                    <input
                        type="number"
                        min={100000}
                        max={999999}
                        name="from"
                        className="input"
                        placeholder="Account Number"
                    />
                    </div>
                    <div className="form__item">
                    <label htmlFor="from" className="label">
                        Transfer to:
                    </label>
                    <input
                        type="number"
                        min={100000}
                        max={999999}
                        name="from"
                        className="input"
                        placeholder="Account Number"
                    />
                    </div>
                    <div className="form__item">
                    <label htmlFor="from" className="label">
                        Enter Amount:
                    </label>
                    <input
                        type="number"
                        min={1}
                        name="from"
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


