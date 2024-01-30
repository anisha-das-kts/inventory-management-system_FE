import React from 'react'

const logout = ({ setToken }) => {
  localStorage.setItem('Token', "")
  const clickHandler = () => {
    window.localStorage.removeItem('UserName','Token','Role');
  }
  return (
      <div>
        <button onClick={clickHandler}>logout </button>
   </div>
  )
}

export default logout