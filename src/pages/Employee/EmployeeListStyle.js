import { faBold } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
// import 'react-select/dist/react-select.css'

const ListStyle = ({}) => {
  const token = localStorage.getItem("Token");
  const [contacts,setContacts]=useState([])
  const [detailModal, setDetailModal] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [userName, setName] = useState();
  const [userEmail, setEmail] = useState();
  const [phoneNumber, setPhone] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();

  const [editId, setEditId] = useState();

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const phoneChange = (e) => {
    setPhone(e.target.value);
  };

  const addressChange = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    CartData();
  },[])

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

      setContacts(response.data.response.content.filter((item)=>item.role==="S"));
   


    } catch (error) {
      console.log(">>>>>>>>>>> error is ", error);
    }
  }
  console.log(contacts)

  const submitHandler = (event) => {
    event.preventDefault();

    const newContact = {
      userName: userName,

      userEmail: userEmail,
      password: password,
      address: address,
      phoneNumber: phoneNumber
    };
    console.log(newContact);

    const putCartData = async (id) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/users/${id}`,
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
      } catch (error) {
        console.log(">>>>>>>>>>> error is ", error);
      }
    };
    putCartData(editId);
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/users/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("deleted", response);
      CartData();
    } catch (error) {
      console.log(">>>>>>>>>>> error is ", error);
    }
  };

  const showDetailHandler = (productId) => {
    const filteredData = contacts.filter(
      (contact) => contact?.productId === productId
    );
    console.log(contacts);
    setFiltered(filteredData);
    // console.log(filtered);
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
        name: "Employee Id",
        selector: (row) => row.id,
      },
  
    {
      name: "Employee Name",
      selector: (row) => row.userName,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
    },

    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Email Address",
      selector: (row) => row.userEmail,
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
          onClick={(e) => {
            deleteHandler(row.id);
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
            setEditId(row.id);
          }}
        >
          Edit
        </button>
      ),
    },

    // {
    //   name: "Vendor",
    //   selector:(row)=>row.vendor
    // },
    // {
    //   name: "Vendor",
    //   selector:(row)=>row.vendor
    // },
    // {
    //   name: "Vendor",
    //   selector:(row)=>row.vendor
    // },
    // {
    //   name: "Vendor",
    //   selector:(row)=>row.vendor
    // }
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

      {/* <Modal
        size="lg"
        isOpen={detailModal}
        toggle={() => setDetailModal(!detailModal)}
      >
        <ModalHeader style={{ color: "green" }}>
          Product extra Details
        </ModalHeader>
        <ModalBody>
          <h4>Quantity : {filtered[0]?.quantity}</h4>
          <h4>ProductDescription : {filtered[0]?.productDescription}</h4>
          <h4>Price Per Piece : {filtered[0]?.price}</h4>
          <h4>Gst : {filtered[0]?.gst}</h4>
          <h4>Purchase Type : {filtered[0]?.purchaseType}</h4>
          <h4>Vendor : {filtered[0]?.vendor}</h4>
        </ModalBody>
      </Modal> */}
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
          Add Your Employee Here:
        </ModalHeader>
        <ModalBody>
          <form className="d-block p-2  " onSubmit={submitHandler}>
            <div className="form-group">
              <label for="exampleInputEmail1">Name :</label>
              <input
                type="text"
                name="userName"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Name "
                onChange={nameChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Email :</label>
              <input
                type="email"
                name="userEmail"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email "
                onChange={emailChange}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Phone number :</label>
              <input
                type="number"
                name="phoneNumber"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Phone Number "
                onChange={phoneChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Address :</label>
              <input
                type="text"
                name="address"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Address "
                onChange={addressChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Password :</label>
              <input
                type="text"
                name="password"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                minlength="8"
                placeholder="Password "
                onChange={passwordChange}
              />
            </div>

            <button
              style={{ borderRadius: "8px", padding: "3px" }}
              className="bg-dark text-white d-block mt-3 rounded"
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
