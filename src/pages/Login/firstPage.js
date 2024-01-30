import React, { useState } from "react";
import Login from "./Login";
// import "./login.css";

import SignUp from "./SignUp";

const FirstPage = () => {
  const [option, setOption] = React.useState(true);
  const [userNameError, setUserNameError] = useState("");
  const [emailChange, handelEmailChange] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordChange, handlePasswordChange] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setsuccessMessage] = useState();
  const [userName, setUsername] = useState("");
  const [userSuccess, setUserSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);


  return (
    <div>
        <Login
          option={option}
          setOption={setOption}
          userNameError={userNameError}
          setUserNameError={setUserNameError}
          emailChange={emailChange}
          handelEmailChange={handelEmailChange}
          passwordChange={passwordChange}
          handlePasswordChange={handlePasswordChange}
          emailError={emailError}
          passwordError={passwordError}
          setEmailError={setEmailError}
          setPasswordError={setPasswordError}
          successMessage={successMessage}
          setsuccessMessage={setsuccessMessage}
          userName={userName}
          setUsername={setUsername}
          setEmailSuccess={setEmailSuccess}
          emailSuccess={emailSuccess}
          passwordSuccess={passwordSuccess}
          setPasswordSuccess={setPasswordSuccess}
          userSuccess={userSuccess}
          setUserSuccess={setUserSuccess}
      />
    
      </div>
     
  );
};
export default FirstPage;
