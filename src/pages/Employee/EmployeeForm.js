import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
// import data from "./mock-data.json";

import _ from "lodash";
import * as AiIcons from "react-icons/ai";

import styled from "styled-components";
import axios from "axios";

import "./EmployeeForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListStyle from "./EmployeeListStyle";

const NavIcon = styled.div`
  display: inline;
`;

const FormData = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(7);
  const [modal, setmodal] = useState(false);
  const [emailError, setEmailError] = useState();
  const [phoneError, setPhoneError] = useState();
  const token = localStorage.getItem("Token");

  const [addFormData, setAddformData] = useState({
    userName: "",
    userEmail: "",
    phoneNumber: "",
    address: "",

    // createdAt: "",
    employeeId: "",
  });

  // useEffect(() => {
  //   axios.get('http://localhost:8080/product/pageNO/0/noOfItems/1')
  //     .then(res => {
  //       console.log(res);
  //       setContacts(res);

  //     });

  // }, [])

  useEffect(() => {
    CartData();
  }, []);


// ---------for refersh page when delete item and  this function is called in the delete handler
  
  
  async function CartData() {
    try {
      const response = await axios.get(
        " http://localhost:8080/pagingAndSortingUser/0/100",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      
      setContacts(response.data.response.content);
      // console.log(productData[1].description);
    } catch (error) {
      console.log(">>>>>>>>>>> error is ", error);
    }
  }
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    setAddformData(() => {
      return { ...addFormData, [fieldName]: fieldValue };
    });

    // const newFormData = { ...addFormData };
    // newFormData[fieldName] = fieldValue;

    // setAddformData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    if (addFormData.userEmail !== "") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (emailRegex.test(addFormData.userEmail)) {
        setEmailError("");
        // setEmailSuccess(true);
      } else {
        toast(
          "Invalid  Email!!!!  You have to fill form again with correct Email"
        );
      }
    } else {
      setEmailError("Email Required");
    }
    if (addFormData.phoneNumber !== "") {
      const phoneRegex = /^(0|91)?[6-9][0-9]{9}$/;
      if (phoneRegex.test(addFormData.phoneNumber)) {
        setPhoneError("");
        // setEmailSuccess(true);
      } else {
        toast(
          "Invalid Phone Number!!!!  You have to fill form again with correct Phone Number"
        );
      }
    } else {
      setPhoneError("Phone Required Required");
    }

    const newContact = {
      userName: addFormData.userName,
      userEmail: addFormData.userEmail,
      password: addFormData.password,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      role: "S",
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    const getCartData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/register/employee",
          newContact,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        CartData();

        if (response.data.statusCode == "200") {
          toast("staff registered successfully");
          // setToken(true);
        } else if (
          response.data.statusCode == "400" ||
          response.data.statusCode == "401" ||
          response.data.statusCode == "402" ||
          response.data.statusCode == "403" ||
          response.data.statusCode == "404" ||
          response.data.statusCode == "405"
        ) {
          toast("staff already exist!!!");
        }
        console.log("Cart returned the data: ", window.token);
        console.log("data is " + response);
        //setContacts(response.response);
        // console.log(productData[1].description);
      } catch (error) {
        console.log(">>>>>>>>>>> error is ", error);
      }
    };
    getCartData();
  };

  const lastPostIndex = currentPage * postPerPage;
  const firPostIndex = lastPostIndex - postPerPage;
  const currentPost = contacts.slice(firPostIndex, lastPostIndex);

  return (
    <div style={{ marginTop: "11vh" }}>
      <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
        <ModalHeader
          style={{
            color: "green",
            display: "flex",
            justifyContent: "center",
            fontSize: "30px",
          }}
        >
          Add Your Employee Here:
        </ModalHeader>
        <ModalBody>
          <form className="d-block p-2  " onSubmit={handleAddFormSubmit}>
            {/* <div className="form-group">
              <label for="exampleInputEmail1">Employee Id:</label>
              <input
                type="number"
                required="required"
                name="employeeId"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Id "
                onChange={handleAddFormChange}
              />
            </div> */}
            <div className="form-group">
              <label for="exampleInputEmail1">Name :</label>
              <input
                type="text"
                required="required"
                name="userName"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Name "
                onChange={handleAddFormChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Email :</label>
              <input
                type="email"
                required="required"
                name="userEmail"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email "
                onChange={handleAddFormChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Phone number :</label>
              <input
                type="number"
                required="required"
                name="phoneNumber"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Phone Number "
                onChange={handleAddFormChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Address :</label>
              <input
                type="text"
                required="required"
                name="address"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Address "
                onChange={handleAddFormChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Password :</label>
              <input
                type="text"
                required="required"
                name="password"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                minlength="8"
                placeholder="Password "
                onChange={handleAddFormChange}
              />
            </div>

            <button
              style={{ borderRadius: "8px", padding: "3px" }}
              className="bg-dark text-white d-block mt-3 rounded"
              onClick={() => setmodal(false)}
            >
              Submit
            </button>
          </form>
        </ModalBody>
      </Modal>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="btn mt-3 d-inline justify-last "
          style={{ fontSize: "1.5rem" }}
        >
          Add Employee
        </button>
        <FontAwesomeIcon
          icon={faPlus}
          size="2x"
          style={{
            paddingLeft: "2px",
            marginTop: "27px",
            background: "navy",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setmodal(true)}
        />
      </div>
      <ToastContainer />

      <ToastContainer />
      <ListStyle contacts={currentPost}  setContacts={setContacts}/>
     
    </div>
  );
};
export default FormData;
