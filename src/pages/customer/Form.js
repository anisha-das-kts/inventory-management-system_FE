import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
// import data from "./mock-data.json";

import _ from "lodash";

import styled from "styled-components";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ListStyle from "./CustomerListStyle";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavIcon = styled.div`
  display: inline;
`;

const FormData = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(7);
  const token = localStorage.getItem('Token');
  const [emailError, setEmailError] = useState();
  const [phoneError, setPhoneError] = useState();

  // useEffect(() => {
  //   axios.get('https://mocki.io/v1/12336cc3-8873-4c59-9fa3-3d2870207bd9')
  //     .then(res => {
  //       setContacts(res.data);

  //     });

  // }, [])
  useEffect(() => {
   
    CartData();
  }, []);
  
  async function CartData() {
    try {
      const response = await axios.get(
        "http://localhost:8080/customer/pageNo/0/noOfCustomers/100",{ headers: {"Authorization" : `Bearer ${token}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'} }
      );
      console.log("Cart returned the data: ", window.token);
      setContacts(response.data.response);
      // console.log(productData[1].description);
    } catch (error) {
      console.log(">>>>>>>>>>> error is ",error);
    }
  }
  const [modal, setmodal] = useState(false);

  const [addFormData, setAddformData] = useState({
    customerName: "",
    customerId: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
  });

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
    if (addFormData.customerEmail !== "") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (emailRegex.test(addFormData.customerEmail)) {
        setEmailError("");
        // setEmailSuccess(true);
      } else {
        toast("Invalid  Email!!!!  You have to fill form again with correct Email"
         );
      
      }
    } else {
      setEmailError("Email Required");
    }
    if (addFormData.customerPhone !== "") {
      const phoneRegex = /^(0|91)?[6-9][0-9]{9}$/;
      if (phoneRegex.test(addFormData.customerPhone)) {
        setPhoneError("");
        // setEmailSuccess(true);
      } else {
        toast("Invalid Phone Number!!!!  You have to fill form again with correct Phone Number"
         );
      
      }
    } else {
      setPhoneError("Phone Required Required");
    }



    const newContact = {
      customerId: addFormData.customerId,
      customerName: addFormData.customerName,
      customerPhone: addFormData.customerPhone,
      customerAddress: addFormData.customerAddress,
      createdAt: addFormData.createdAt,
      customerEmail: addFormData.customerEmail,
    };

    const newContacts = [...contacts, newContact];
    const getCartData=async() =>  {
      try {
        const response = await axios.post(
          "http://localhost:8080/addcustomer",newContact,{ headers: {"Authorization" : `Bearer ${token}`,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
       } })
          ;
          if (response.data.statusCode == "200") {

            toast("Customer Added successfully");
            // setToken(true);
           
        }
        
        
        console.log("Cart returned the data: ", window.token);
        console.log("data is " + response);
        CartData();

        // console.log(productData[1].description);
      } catch (error) {
        console.log(">>>>>>>>>>> error is ",error);
      }
    }
    getCartData();
  };  
  
  const lastPostIndex = currentPage * postPerPage;
  const firPostIndex = lastPostIndex - postPerPage;
  const currentPost = contacts.slice(firPostIndex, lastPostIndex);
  return (
    <div style={{ marginTop: "11vh" }}>
      <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
        
        <ModalHeader style={{ color: "green" }}>
          Add Customer here
        </ModalHeader>
        <ModalBody>
          <form className="d-block p-2" onSubmit={handleAddFormSubmit}>
            {/* <div className="form-group"> */}
              {/* <label for="exampleInputEmail1">Id :</label>
              <input
                type="number"
                required="required"
                name="customerId"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="id "
                onChange={handleAddFormChange}
              />
            </div> */}

            <div className="form-group">
              <label for="exampleInputEmail1">Name :</label>
              <input
                type="text"
                required="required"
                name="customerName"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Name "
                onChange={handleAddFormChange}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Phone Number :</label>
              <input
                type="number"
                required="required"
                name="customerPhone"
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
                name="customerAddress"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Address "
                onChange={handleAddFormChange}
              />
            </div>

          
            <div className="form-group">
              <label for="exampleInputEmail1">Email Address : </label>
              <input
                type="email"
                className="form-control"
                name="customerEmail"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Email "
                onChange={handleAddFormChange}
              />
            </div>
           

            <button
               style={{borderRadius:"8px",padding:"3px"}}
              className="bg-dark text-white d-block mt-3"
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
          Add Customers{" "}
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
      <ToastContainer

/>
      <ListStyle contacts={contacts} setContacts={setContacts} />
      {/* <Pagination totalPost={contacts.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} /> */}
    </div>
  );
};
export default FormData;