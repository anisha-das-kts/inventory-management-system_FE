import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import axios from "axios";

const UserListStyle = () => {
  const token = localStorage.getItem("Token");
  const [contacts, setContacts] = useState([]);
  const [editModal, setEditModal] = useState();
  const [rentStatus, setRentalStatus] = useState();
  const [rentalId, setRentalId] = useState();

  useEffect(() => {
    CartData();
    //   putCartData();
  }, []);

  async function CartData() {
    try {
      const response = await axios.get("http://localhost:8080/rentals", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // console.log("Cart returned the data: ", token);
      console.log("data is", response);
      setContacts(response.data.response);
    } catch (error) {
      console.log(">>>>>>>>>>> error is ", error);
    }
  }

  const customStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const columns = [
    {
      name: "Rental Id",
      selector: (row) => row.rentalId,
    },
    {
      name: "Product Id",
      selector: (row) => row.productId,
    },
    {
      name: "Product Name",
      selector: (row) => row.product.productName,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
    },
    {
      name: "Issue Date",
      selector: (row) => row.issueDate,
    },

    {
      name: "Return Date",
      selector: (row) => row.returnDate,
    },
    {
      name: "Rental Status",
      cell: (row) => (
        <button
          style={{
            borderRadius: "5px",
            padding: "5px",
            color: "black",
            backgroundColor:
              row.rentalStatus == "PENDING"
                ? "yellow"
                : row.rentalStatus === "APPROVED"
                ? "lightgreen"
                : "red",
          }}
          onClick={() => {
            setEditModal(true);
            setRentalId(row.rentalId);
          }}
        >
          {row.rentalStatus === "PENDING"
            ? "PENDING"
            : row.rentalStatus === "APPROVED"
            ? "APPROVED"
            : "REJECTED"}
        </button>
      ),
    },
  ];

  const rentalStatusChange = (e) => {
    console.log(e.target.value);
    setRentalStatus(e.target.value);
    };
    
    const changeRentalId = (e) => {
        setRentalId(e.target.value);
    }

  const submitHandler = (e) => {
    e.preventDefault();
    const newContact = {
        rentalStatus: rentStatus,
        rentalId:rentalId
    };
    console.log(rentStatus);

    const putCartData = async () => {
      try {
        const response = await axios.put(
          "http://localhost:8080/rentals/approve",
          newContact,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        console.log("dsfghf", response);
        // getCartData();
        CartData();
      } catch (error) {
        console.log(">>>>>>>>>>> error is ", error);
      }
    };
    putCartData();
  };

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
          Edit Your Product
        </ModalHeader>
        <ModalBody>
          <form className="d-block p-2  " onSubmit={submitHandler}>
            <div className="form-group">
              <label for="exampleInputEmail1">Rental Id :</label>
              <input
                type="number"
                required="required"
                name="rentalId"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Rental Id "
                value={rentalId}
                onChange={changeRentalId}
              />
            </div>

            <div>
              <label for="cars">Change Rental Status:</label>

              <select
                type="text"
                name="rentalStatus"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Rental Status"
                onChange={rentalStatusChange}
              >
                <option value="none" selected disabled>
                  --Select--
                </option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
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

export default UserListStyle;
