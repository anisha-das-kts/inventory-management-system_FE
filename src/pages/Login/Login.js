import React, { useEffect, useState } from "react";
// import "./login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Book from "./img/Book_2.jpg"
import Logo from "./img/logo.png"


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
 
  CardButton,
  CardLink,
} from "./Style";

const Login = ({
  option,
  userNameError,
  setUserNameError,
  emailChange,
  handelEmailChange,
  passwordChange,
  handlePasswordChange,
  emailError,
  setEmailError,
  passwordError,
  setPasswordError,
  setsuccessMessage,
  successMessage,
  userName,
  setUsername,
  userSuccess,
  setUserSuccess,
  passwordSuccess,
  setPasswordSuccess,
  emailSuccess,
  setEmailSuccess,
 
}) => {
  const navigate = useNavigate();


  // useEffect(() => {
  //   if (token) {
  //     navigate("/dashboard");
  //   }
  //   else {
  //     navigate("/");
  //   }
  // }, [token]);


  const handlePassword = (e) => {
    setPasswordError("");
    setsuccessMessage("");
    handlePasswordChange(e.target.value);
  };
  const handleUserName = (e) => {
    setUserNameError("");
    setsuccessMessage("");
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordChange !== "") {
      const passwordLength = passwordChange.length;
      if (passwordLength < 8) {
        setPasswordError("Password must be a minimum of 8 characters");
      } else {
        setPasswordSuccess(true);
      }
    } else {
      setPasswordError("Password Required");
    }
    if (userName !== "") {
      const userRegex = /^[A-Za-z]+$/;
      if (userRegex.test(userName)) {
        setUserNameError("");
        setUserSuccess(true);
      } else {
        setUserNameError("Invalid UserName");
      }
    } else {
      setUserNameError("Name Required");
    }
  
    const res = await axios
      .post("http://localhost:8080/login", {
        userName: userName,
        password: passwordChange,
      })
      .then((res) => {
       
          
        if (res.data.statusCode == "200" &&(res.data.response.role=="O"||res.data.response.role=="S")) {
           
         
          localStorage.setItem("Role", res.data.response.role);
          
          console.log(res.data.response.role);
         
          localStorage.setItem("Token", res.data.response.token)
          localStorage.setItem("UserName", res.data.response.userName)
          
            
          console.log("token..." + window.role)
          // alertFunction();
          alert("Login Successfully!!")
            
          // setToken(true);
            
          navigate("/dashboard");
          
             
        }
        else if (res.data.statusCode == "200" && res.data.response.role == "U")
        {

          console.log(res);
          localStorage.setItem("Role", res.data.response.role);
          localStorage.setItem("UserId", res.data.response.id);
         
          localStorage.setItem("Token", res.data.response.token)
          localStorage.setItem("UserName", res.data.response.userName)
          
          navigate("/ordering");
          }
        
        else {
       
          toast.error("Incorrect username or password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
         
      })
      .catch((e) => console.log("Error aa gyi", e));
   
    handelEmailChange("");
    handlePasswordChange("");
  }
  
  
  return (
    <div>
      <img src={Logo} alt="" />
      <div style={{ display: "flex", justifyContent: "center", marginLeft: "60px", marginTop: "25px" }}>
        <img src={Book} style={{ width: "50%", margin: "20px", borderRadius: "5px" }} />
        <form className="account-form" onSubmit={handleSubmit}  >
      
          <CardWrapper>
            <CardHeader>
          
              <CardHeading>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Welcome Back</h1>
              </CardHeading>
            </CardHeader>
        
            <CardHeader>
          
              <CardHeading>Sign In</CardHeading>
            </CardHeader>
            <CardBody>
          
              <CardFieldset>
            
                <input
                  id="UserName"
                  name="UserName"
                  type="text"
                  placeholder="Username"
                  className="form-control custom-input"
                  onChange={handleUserName}
                  value={userName}
                />
                {userNameError && <div className="error-msg">{userNameError}</div>}

              </CardFieldset>
         
              <CardFieldset>
            
                <input
                  id="password"
                  name="password"
                  value={passwordChange}
                  type="password"
                  placeholder="Password"
                  className="form-control custom-input"
                  onChange={handlePassword}
                />

                {passwordError && <div className="error-msg">{passwordError}</div>}
      
              </CardFieldset>
         
        
              <CardFieldset>
            
                <CardButton type="submit">Sign In</CardButton>
              </CardFieldset>
              <CardFieldset>
            
                <Link to="/SignUp">
              
                  <CardLink>New User ?</CardLink>{" "}
                </Link>
              </CardFieldset>
            </CardBody>
          </CardWrapper>
        </form>
 
       

        <ToastContainer />
      </div>
    </div>
  )
}
    export default Login;

