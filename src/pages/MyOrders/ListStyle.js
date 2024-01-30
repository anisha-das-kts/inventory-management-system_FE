import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

import axios from "axios";

// import 'react-select/dist/react-select.css'

const OrderBookListStyle = () => {
  const token = localStorage.getItem("Token");
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    CartData(localStorage.getItem("UserId"));
  }, []);
  async function CartData(userId) {
    try {
      const response = await axios.get(
        `http://localhost:8080/rentals/users/${userId}/rentals`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Cart returned the data: ", token);
      console.log("data is", response.data);
      setContacts(response.data);
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
            color:"black",
            backgroundColor:
              row.rentalStatus == "PENDING"
                ? "yellow"
                : row.rentalStatus === "APPROVED"
                ? "lightgreen"
                : "red",
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
    </div>
  );
};

export default OrderBookListStyle;
