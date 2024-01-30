import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";

// import 'react-select/dist/react-select.css'

const ListStyle = ({ contacts, setContacts }) => {
  const [editModal, setEditModal] = useState(false);

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [editId, setEditId] = useState();

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const changeAddress = (e) => {
    setAddress(e.target.value);
  };
  const token = localStorage.getItem("Token");

  //  ---------- for refersh page when delete item and  this function is called in the delete handler
  async function CartData() {
    try {
      const response = await axios.get(
        "http://localhost:8080/customer/pageNo/0/noOfCustomers/100",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Cart returned the data: ", window.token);
      setContacts(response.data.response);
      // console.log(productData[1].description);
    } catch (error) {
      console.log(">>>>>>>>>>> error is ", error);
    }
  }

  // const editHandler = (customerId) => {
  //   const id = contacts.filter((contact) =>
  //     customerId == contact.customerId
  //   )
  //   setEditModal(true);
  //   setEditId(id);
  // };

  const submitHandler = (event) => {
    event.preventDefault();

      const newContact = {
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        customerAddress: address
    }
    console.log(newContact);

      const putCartData = async (customerId) => {
        try {
          const response = await axios.put(
            `http://localhost:8080/customers/${customerId}`,
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
      putCartData(editId);

  }

  const deleteHandler = async (customerId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/customers/${customerId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // getCartData();
      console.log("deleted", response);
      CartData();
    } catch (error) {
      console.log(">>>>>>>>>>> error is ", error);
    }
  };

  const [detailModal, setDetailModal] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const showDetailHandler = (customerId) => {
    const filteredData = contacts.filter(
      (contact) => contact?.customerId === customerId
    );
    // console.log({contacts})
    setFiltered(filteredData);
    console.log(filtered);
  };
  const setDetail = () => {
    setDetailModal(true);
  };
  const customStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
  };
  const columns = [
    {
      name: "Customer Id",
      selector: (row) => row.customerId,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customerName,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
    },

    {
      name: "Phone Number",
      selector: (row) => row.customerPhone,
    },
    {
      name: "Address",
      selector: (row) => row.customerAddress,
    },
    {
      name: "Extra Details",
      cell: (row) => (
        <button
          style={{
            border: "none",
            backgroundColor: "white",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
          onClick={() => {
            showDetailHandler(row.customerId);
            setDetail();
          }}
        >
          Extra Details
        </button>
      ),
    },

    {
      name: "DELETE",
      cell: (row) => (
        <button
          style={{
            backgroundColor: "Red",
            fontWeight: "bold",
            padding: "4px",
            borderRadius: "5px",
          }}
          onClick={() => {
            deleteHandler(row.customerId);
          }}
        >
          Delete
        </button>
      ),
    },
    {
      name: "EDIT",
      cell: (row) => (
        <button
          style={{
            backgroundColor: "lightGreen",
            fontWeight: "bold",
            paddingTop: "4px",
            paddingLeft: "14px",
            paddingBottom: "4px",
            paddingRight: "14px",
            borderRadius: "5px",
          }}
          onClick={() => {
            setEditModal(true);
            setEditId(row.customerId);
          }}
        >
          Edit
        </button>
      ),
    },
  ];
  return (
    <div>
      <DataTable
        columns={columns}
        customStyles={customStyles}
        data={contacts}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        highlightOnHover
      />

      <Modal
        size="lg"
        isOpen={detailModal}
        toggle={() => setDetailModal(!detailModal)}
      >
        <ModalHeader
          style={{ color: "green", display: "flex", justifyContent: "center" }}
        >
          Customer Details
        </ModalHeader>
        <ModalBody>
          <h4>Email Address:{filtered[0]?.customerEmail}</h4>
        </ModalBody>
      </Modal>

      <Modal
        size="lg"
        isOpen={editModal}
        toggle={() => setEditModal(!editModal)}
      >
        <ModalHeader
          style={{
            color: "green",
            display: "flex",
            justifyContent: "center",
            fontSize: "30px",
          }}
        >
          Edit Customer Detail
        </ModalHeader>
        <ModalBody>
          <form className="d-block p-2  " onSubmit={submitHandler}>
            <div className="form-group">
              <label for="exampleInputEmail1">Name :</label>
              <input
                type="text"
              
                name="productName"
                className="form-control"
                id="productName"
                aria-describedby="emailHelp"
                placeholder="Name "
                onChange={changeName}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Phone Number :</label>
              <input
                type="number"
             
                name="customerPhone"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Phone Number "
                onChange={changePhone}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Address :</label>
              <input
                type="text"

                name="customerAddress"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Address "
                onChange={changeAddress}
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
                placeholder="Enter email"
                onChange={changeEmail}
              />
            </div>

            <button
              style={{ borderRadius: "8px", padding: "3px" }}
              className="bg-dark text-white d-block mt-3 "
              onClick={() => setEditModal(false)}
            >
              Submit
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ListStyle;
