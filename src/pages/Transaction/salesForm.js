import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
// import data from "./mock-data.json";

import _ from "lodash";


import styled from "styled-components";
import axios from "axios";

import "./salesForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ListStyle from "./TransactionListStyle";
const NavIcon = styled.div`
  display: inline;
`;

const FormData = () => {
  const [contacts, setContacts] = useState([]);
  const [customeName, setCustomerName] = useState([]);
  const [productName, setProductName] = useState([]);

  const [customer, setCustomer] = useState();
  const [product, setProduct] = useState();
  const [productId, setProductId] = useState();
  const [quantity, setQuantity] = useState();
  const [amount, setAmount] = useState();
  const [purchaseType, setpurchaseType] = useState();
  const [valueof, setValue] = useState();
  const [productArray, setProductArray] = useState();
  const [purchaseTypeValue, setPurchaseTypeValue] = useState();
  const [inventoryQuantity, setInventoryQuantity] = useState();

  const [globalValue, setGlobalValue] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(7);
  const [quantityValue, setQuantityValue] = useState();
  const token = localStorage.getItem("Token");

  const [modal, setmodal] = useState(false);
 


  // for selecting default value





  // Api calling 
  useEffect(() => {
    CartData();
    getCustomerName();
    getProductName();
  }, []);


  async function CartData() {
    try {
      const response = await axios.get(
        "http://localhost:8080/transaction/pageNo/0/noOfTransactions/1000/sortBy/createdAt",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setContacts(response.data.response);
    } catch (error) {
      console.log(">>>>>>>>>>> error is ", error);
    }
  }

  async function getCustomerName() {
    try {
      const response = await axios.get("http://localhost:8080/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      var options = response.data.response.map((item) => ({
        value: item.customerId,
        label: item.customerName,
      }));
      setCustomerName(options);
    } catch (error) {
      console.log(">>>>>>>>>>> error is ", error);
    }
  }

  async function getProductName() {
    try {
      const response = await axios.get("http://localhost:8080/allProducts", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setProductArray(response.data.response);

      var options = response.data.response.map((item) => ({
        value: item.productId,
        label: item.productName,
      }));
      setProductName(options);
    } catch (error) {
      console.log(">>>>>>>>>>> error is ", error);
    }
  }
  // useEffect(() => {
  //   if (product == "")
  //   {
  //     console.log("Hello")
  //   }
  //   else {
  //     getValue(product)
  //   }
   

  // }, [product]);


  const getValue = (value) => {
    {
      
      const wantedArray = productArray?.filter(
        (item) => value == item.productName
      );
      // console.log(wantedArray);



      setGlobalValue(wantedArray[0].price);
      console.log(globalValue, "dfghfdsfgfd");
      setPurchaseTypeValue(wantedArray[0].purchaseType)
      console.log(purchaseTypeValue,"fdghfdsfgdgg");
      setpurchaseType(wantedArray[0].purchaseType)
      console.log(purchaseType,"dfdgvsdfgf");
      setInventoryQuantity(wantedArray[0].quantity)

      



    
 
     
    }
  };

  // Value change form
  const customerNameChange = (e) => {
    const value = e.label;
    setCustomer(value);
  };
  const productNameChange = (e) => {
    const value = e.label;
    setProduct(value);
    getValue(value);
 };

  const quantityChange = (e) => {
    const value = e.target.value;
     
    setQuantity(value);
    setQuantityValue(value);
    setValue(value * globalValue);


  };

  const AmountChange = (e) => {
    const value = e.target.value;
   
   
    setAmount(value);
    // console.log(value)
    // console.log(amount);
  };
 

  const purTypeChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setpurchaseType(value);
    console.log(purchaseType)
    
  };



 

  // Post request
  const handleAddFormSubmit = (event) => {
    
    if (quantity <= inventoryQuantity) {
      event.preventDefault();
    const newContact = {
      quantity: quantity,
      customerName: customer,
      productName: product,
      totalAmount: valueof,
      purchaseType: purchaseType,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
   
   
      const getCartData = async () => {
     
        try {
          const response = await axios.post(
            "http://localhost:8080/createTransaction",
            newContact,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.statusCode == 200) {
            toast("Transaction Added SuccessFully");
          }

          CartData();
        } catch (error) {
          console.log(">>>>>>>>>>> error is ", error);
        }
      };

      const putCartData = async () => {
        try {
          const response = await axios.put(
            `http://localhost:8080/products/${productId}/quantity/subtract/${quantity}`,
            { quantity, productId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);

          CartData();
        } catch (error) {
          console.log(">>>>>>>>>>> error is ", error);
        }
      };
      getCartData();

      putCartData();
    }

    else {
      alert("Less Item In Inventory Than Demand")
    }
  
  };
  const lastPostIndex = currentPage * postPerPage;
  const firPostIndex = lastPostIndex - postPerPage;
  const currentPost = contacts.slice(firPostIndex, lastPostIndex);

  return (
    <div>
      <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
        ;
        <ModalHeader style={{ color: "green" }}>
          Add Your Transaction
        </ModalHeader>
        <ModalBody>
          <form className="d-block p-2  " onSubmit={handleAddFormSubmit}>
            <div className="form-group">
              <label for="exampleInputEmail1">Customer Name :</label>
              <Select
                options={customeName}
                classNamePrefix="select"
                defaultValue={"Custome Name"}
                isSearchable={true}
                name="customerName"
                placeholder="Customer Name"
                onChange={customerNameChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Product Name :</label>
              <Select
                options={productName}
                classNamePrefix="select"
                defaultValue={"Product Name"}
                isSearchable={true}
                name="color"
                placeholder="Product Name"
                onChange={productNameChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Quantity : </label>
              <input
                type="number"
                required="required"
                name="quantity"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={quantityValue}
                placeholder="Quantity "
                onChange={quantityChange}
              />
            </div>

           

                   <div className="form-group">
              <label for="exampleInputEmail1">Total Amount : </label>

              <select
                type="number"
                required="required"
                name="totalAmount"
                className="form-control"
                id="exampleInputEmail1"
                
                aria-describedby="emailHelp"
                placeholder="Total Amount "
                onChange={AmountChange}
              >
                 <option value="none" selected disabled >--Select--</option>
                <option value="valueof">{ valueof}</option>
                
              </select>
          



              <div className="form-group">
              <label for="exampleInputEmail1">Purchase Type : </label>

              <select
                type="text"
                required="required"
                name="purchaseType"
                className="form-control"
                id="exampleInputEmail1"
                
                aria-describedby="emailHelp"
                placeholder="Purchase Type: "
                onChange={purTypeChange}
              >
                 <option value="none" selected disabled >--Select--</option>
                 <option value="Buy">Buy</option>
                {/* <option value="purchaseType">{purchaseType}</option> */}
                
              </select>
          

              </div>
            </div>
            <button
              style={{ borderRadius: "8px", padding: "3px" }}
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
          Add Transaction{" "}
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
     <ListStyle contacts={contacts}></ListStyle>
    </div>
  );
};
export default FormData;
