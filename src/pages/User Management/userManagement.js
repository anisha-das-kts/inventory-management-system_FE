import React from 'react'
import Sidebar from '../../components/Sidebar'
import UserListStyle from './UserListStyle'

const UserManagement = () => {
  return (
    <div style={{ marginTop: "11vh" }}>
      
      <Sidebar />
      <UserListStyle />
    </div>
  )
}

export default UserManagement