import React from 'react';
import Sidebar from '../Sidebar/sidebar';
import './Transaction.css'
import BasicTable from '../Table/Table';


function Transaction() {
    return (
  <div className="Blackp">
      <div className ="framy">
        <Sidebar/>
        <div className="mtt">
        <BasicTable/>
        </div>
        </div>
      </div> 
             
    );
  }
  
  export default Transaction;
  
  
  