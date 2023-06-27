import React from 'react';
import { Link } from 'react-router-dom';
import "./Dashboard.css"
import Sidebar from './Sidebar/sidebar';
import MainDash from './MainDash/MainDash';
import Transfer from './Transfer/Transfer';


export default function Dashboard() {

  return (
    <div className='Blackp'>
        <div className='framee'>
          <Sidebar/>
          <MainDash/>
        </div>
    </div>
    
  );
}


