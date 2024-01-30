import React,{useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "./img/logo.png"


import { ToastContainer, toast } from 'react-toastify';
import Book from "./img/Book_2.jpg"
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

const SignUp =() => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneError, setPhoneError] = useState();
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
  const [addressSuccess, setAddressSuccess] = useState(false);
  const [phoneNumberSuccess, setPhoneNumberSuccess] = useState(false);
  const [addressChange, handleAddressChange] = useState();
  const [addressError, setAddressError] = useState();
 

  const handleEmail = (e) => {
    setsuccessMessage("");
    setEmailError("");
    handelEmailChange(e.target.value);
    console.log(emailChange);
  };
  
  const handlePassword = (e) => {
    setPasswordError("");
    setsuccessMessage("");
    handlePasswordChange(e.target.value);
    console.log(e.target.value);
  };

  const handleAddress = (e) => {
    setPasswordError("");
    setsuccessMessage("");
    handleAddressChange(e.target.value);
    console.log(e.target.value);
  };

  const handleUserName = (e) => {
    setUserNameError("");
    setsuccessMessage("");
    setUsername(e.target.value);
    console.log(userName);
  };

  const handlePhone = (e) => {
    setPhoneError("");
    setsuccessMessage("");
    setPhoneNumber(e.target.value);
    console.log(phoneNumber)
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    console.log("sfdgh")
   


    if (emailChange !== "") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (emailRegex.test(emailChange)) {
        setEmailError("");
        setEmailSuccess(true);
      } else {
        setEmailError("Invalid Email");
      }
    } else {
      setEmailError("Email Required");
    }

    if (phoneNumber !== "") {
      const phoneRegex = /^(0|91)?[6-9][0-9]{9}$/;
      if (phoneRegex.test(phoneNumber)) {
        setPhoneError("");
        setPhoneNumberSuccess(true);
       
      } else {
        setPhoneError("Invalid Phone Number!!!!  You have to fill Phone Number again with correct Phone Number"
         );
      
      }
    } else {
      setPhoneError("Phone Required Required");
    }

    if (passwordChange !== "") {
      const passwordLength = passwordChange.length;
      if (passwordLength < 8) {
        setPasswordError("Password must be a minimum of 8 characters");
      } else {
        setPasswordSuccess(true);
      }
    } else {
      setPasswordError("password Required");
  }
  
  if (addressChange !== "") {
    const addresslength = addressChange.length;
    if (addresslength<15) {
      setAddressError("Address length must be 15 character long");
    } 
    else {
      setAddressSuccess(true);
    }
    
  } else {
    setAddressError("Address Required");
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

    if (phoneNumberSuccess == true &&
      userSuccess == true &&
      passwordSuccess == true &&
      emailSuccess == true &&
      addressSuccess == true) {
  
      const res = await axios.post("http://localhost:8080/register", {
        userName: userName,
        userEmail: emailChange,
        password: passwordChange,
      
        address: addressChange,
        phoneNumber:phoneNumber
  
       
      })
        .then((res) => {
          
          if (res.data.statusCode == "200") {
            // console.log("dgwaddawd" ,res.data.response.Id);
            localStorage.setItem("UserId",res.data.response.Id )
            toast("user registered successfully");
            navigate("/");
          } else {
       
            toast.error("user already exist!!!", {
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

      setUsername("");
      handelEmailChange("");
      handlePasswordChange("");
      setPhoneNumber("");
      handleAddressChange("");
    }
  }
  return (
    <div>
      <img src={Logo} alt="" />
    <div style={{display:"flex",justifyContent:"center", marginLeft:"60px"}}>
    <img src={Book} style={{width:"50%", margin:"20px" ,borderRadius:"5px"}} />
      <form className="account-form" onSubmit={handleSubmit}>
        <CardWrapper>
          <CardHeader>
            <CardHeading>Sign Up</CardHeading>
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
              {userNameError && (
                <div className="error-msg">{userNameError}</div>
              )}
            </CardFieldset>
            <CardFieldset>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                className="form-control custom-input"
                value={emailChange}
                onChange={handleEmail}
              />
              {emailError && <div className="error-msg">{emailError}</div>}
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

              {passwordError && (
                <div className="error-msg">{passwordError}</div>
              )}
            </CardFieldset>
            <CardFieldset>
              <input
                id="address"
                name="address"
                value={addressChange}
                type="text"
                placeholder="Address"
                className="form-control custom-input"
                onChange={handleAddress}
              />

              {addressError && (
                <div className="error-msg">{addressError}</div>
              )}
              </CardFieldset>
              
              <CardFieldset>
              <input
                id="phone"
                name="phone"
                value={phoneNumber}
                type="phone"
                placeholder="Phone Number"
                className="form-control custom-input"
                onChange={handlePhone}
              />

              {phoneError && (
                <div className="error-msg">{phoneError}</div>
              )}
            </CardFieldset>
            <CardFieldset>
              <CardButton type="submit">Sign Up</CardButton>{" "}
            </CardFieldset>{" "}
            <CardFieldset>
              <Link to="/">
                <CardLink>Already have an account ?</CardLink>{" "}
              </Link>
            </CardFieldset>
          </CardBody>
        </CardWrapper>
      </form>

        <ToastContainer />
        </div>
    </div>
  );
};

export default SignUp;
