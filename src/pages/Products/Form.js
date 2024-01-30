import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
// import data from "./mock-data.json";

import _ from "lodash";
import * as AiIcons from "react-icons/ai";

import styled from "styled-components";
import axios from "axios";

import ListStyle from "./ListStyle";
import "./form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavIcon = styled.div`
  display: inline;
`;

const FormData = () => {
  const token = localStorage.getItem("Token");
  const [contacts, setContacts] = useState([{}]);
  const [contactsQuantity, setContactsQuantity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(7);
  const [modal, setmodal] = useState(false);
  const [quantityModal,setQuantityModal]=useState(false)

  const [addFormData, setAddformData] = useState({
    productName: "",
    productDescription: "",
    quantity: "",
    price: "",
    gst: "",
    category: "",
    vendor: "",
    purchaseType: "",
    productId: "",
  });

  // const [addFormDataQuantity, setAddformDataQuantity] = useState({
  //   productId: "", 
  //   quantity: "",
  // });
  const [productId, setProductId] = useState('');
   const [quantity, setQuantity] = useState('');


  useEffect(() => {
    CartData();
   


  }, []);

  useEffect(() => {
   
    
    setContactsQuantity(contactsQuantity);
    console.log(contactsQuantity);

  }, []);
  // console.log(contacts)

  async function CartData() {
    try {
      const response = await axios.get(
        "http://localhost:8080/product/pageNO/0/noOfItems/1000",
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

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    setAddformData (() => {
      return { ...addFormData, [fieldName]: fieldValue };
    });

    // const newFormData = { ...addFormData };
    // newFormData[fieldName] = fieldValue;

    // setAddformData(newFormData);
  };

  // const handleAddFormQuantityChange = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   console.log(fieldName)
  //   const fieldValue = event.target.value;
    

  //   setAddformDataQuantity(() => {
  //     return { ...addFormDataQuantity, [fieldName]: fieldValue };
  //   });

    // const newFormData = { ...addFormData };
    // newFormData[fieldName] = fieldValue;

    // setAddformData(newFormData);
  // };
  

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      productName: addFormData.productName,
      productDescription: addFormData.productDescription,
      quantity: addFormData.quantity,
      price: addFormData.price,
      gst: addFormData.gst,
      category: addFormData.category,
      vendor: addFormData.vendor,
      purchaseType: addFormData.purchaseType,

      // createdAt: addFormData.createdAt,
      productId: addFormData.productId,
    };


    const newContacts = [...contacts, newContact];
    console.log(contacts)
    setContacts(newContacts);
    // console.log(newContact);

    const getCartData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/addproduct",
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
          toast("Product Added Successfully");
        }
        console.log(JSON.stringify(response.data.statusCode));
        console.log("data is " + JSON.stringify(response.data.response));

        CartData();
      } catch (error) {
        console.log(">>>>>>>>>>> error is ", error);
      }
    };
    getCartData();
  };
  const productIdChange = (e) => {
    setProductId(e.target.value)
    console.log(e.target.value);
 }
 const quantityChange = (e) => {
  setQuantity(e.target.value)
  console.log(e.target.value);
}
  const handleAddFormQuantitySubmit = (event) => {
    event.preventDefault();
    const newContact = {
      productId: productId,
    
      quantity:quantity,
    

      
    
    };
    
    
    // const newContacts = [...contactsQuantity, newContact];
   
    // setContactsQuantity(newContacts);


    const putCartData = async () => {
      try {
        const response = await axios.put(
          `http://localhost:8080/products/${productId}/quantity/add/${quantity}`,
          newContact,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
       
        // getCartData();
        CartData();

      } catch (error) {
        console.log(">>>>>>>>>>> error is ", error);
      }
    };
    putCartData();

   


  }


  const lastPostIndex = currentPage * postPerPage;
  const firPostIndex = lastPostIndex - postPerPage;
    const currentPost = contacts.slice(firPostIndex, lastPostIndex);
  return (
    <div style={{ marginTop: "11vh" }} >
      <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
        <ModalHeader
          style={{
            color: "green",
            display: "flex",
            justifyContent: "center",
            fontSize: "30px",
          }}
        >
          Add Your product here
        </ModalHeader>
        <ModalBody>
          <form className="d-block p-2  " onSubmit={handleAddFormSubmit}>
            <div className="form-group">
              <label for="exampleInputEmail1">Product Id:</label>
              <input
                type="number"
                required="required"
                name="productId"
                className="form-control"
                id="productId"
                aria-describedby="emailHelp"
                placeholder="Product Id "
                onChange={handleAddFormChange}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Name :</label>
              <input
                type="text"
                required="required"
                name="productName"
                className="form-control"
                id="productName"
                aria-describedby="emailHelp"
                placeholder="Name "
                onChange={handleAddFormChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Description :</label>
              <input
                type="text"
                required="required"
                name="productDescription"
                className="form-control"
                id="productDescription"
                aria-describedby="emailHelp"
                placeholder="Description "
                onChange={handleAddFormChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Category :</label>
              <input
                type="text"
                required="required"
                name="category"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Category "
                onChange={handleAddFormChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Price :</label>
              <input
                type="number"
                required="required"
                name="price"
                className="form-control"
                id="price"
                aria-describedby="emailHelp"
                placeholder="Price "
                onChange={handleAddFormChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Gst :</label>
              <input
                type="number"
                required="required"
                name="gst"
                className="form-control"
                id="gst"
                aria-describedby="emailHelp"
                placeholder="GST "
                onChange={handleAddFormChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Quantity :</label>
              <input
                type="number"
                required="required"
                name="quantity"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Quantity "
                onChange={handleAddFormChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Vendor :</label>
              <input
                type="text"
                required="required"
                name="vendor"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Vendor  "
                onChange={handleAddFormChange}
              />
            </div>
            <div>
              <label for="cars">Purchase Type:</label>

              <select
                type="text"
                required="required"
                name="purchaseType"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Purchase Type "
                onChange={handleAddFormChange}
              >
                 <option value="none" selected disabled >--Select--</option>
                <option value="Rent">Rent</option>
                <option value="Buy">Buy</option>
              </select>
            </div>

            <button
              style={{ borderRadius: "8px", padding: "3px" }}
              className="bg-dark text-white d-block mt-3 "
              onClick={() => setmodal(false)}
            >
              Submit
            </button>
          </form>
        </ModalBody>
      </Modal>

      <Modal size="lg" isOpen={quantityModal} toggle={() => setQuantityModal(!modal)}>
        <ModalHeader
          style={{
            color: "green",
            display: "flex",
            justifyContent: "center",
            fontSize: "30px",
          }}
        >
           Submit Product Quantity
        </ModalHeader>

        <ModalBody>
        <form className="d-block p-2  " onSubmit={handleAddFormQuantitySubmit}>
        <div className="form-group">
        <label for="exampleInputEmail1">Product Id:</label>
              <input
                type="number"
                required="required"
                name="productId"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Product Id "
                onChange={productIdChange}
            />
            </div>
          
          <div className="form-group">
              <label for="exampleInputEmail1">Quantity :</label>
              <input
                type="number"
                required="required"
                name="quantity"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Quantity "
                onChange={quantityChange}
              />
          </div>
          <button
              style={{ borderRadius: "8px", padding: "3px" }}
              className="bg-dark text-white d-block mt-3 "
              onClick={() => setQuantityModal(false)}
            >
              Submit
          </button>
          </form>
           </ModalBody>
      </Modal>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <button className="btn mb-3 " style={{ fontSize: "1.3rem" }}>
            Add Custom Inventory
          </button>
          <FontAwesomeIcon
            icon={faPlus}
            size="2x"
            style={{
              paddingLeft: "4px",
              marginTop: "27px",
              background: "navy",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => setmodal(true)}
          />
        </div>
        <div>
          <button className="btn mb-3" style={{ fontSize: "1.3rem" }}>
            Submit Product Quantity{" "}
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
            onClick={() => setQuantityModal(true)}
          />
        </div>
      </div>
      <ToastContainer />
      {/* <Table contacts={currentPost} /> */}
      <ListStyle contacts={contacts}  setContacts={setContacts}></ListStyle>
      {/* <Pagination
        totalPost={contacts.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
      /> */}
    </div>
  );
};
export default FormData;
