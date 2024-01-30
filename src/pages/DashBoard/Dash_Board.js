import React from 'react'
import Sidebar from '../../components/Sidebar';
import DashBoard from './DashBoard';

const Dash_Board = () => {
  return (
      <div className='dashBoard-NavBar'>
          <Sidebar />
      <DashBoard />    
  </div>
  )
}

export default Dash_Board;