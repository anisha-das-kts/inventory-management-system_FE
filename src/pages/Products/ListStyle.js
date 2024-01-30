import { faBold } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
// import 'react-select/dist/react-select.css'

const ListStyle = ({ contacts, setContacts }) => {
  const token = localStorage.getItem("Token");
  const [detailModal, setDetailModal] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [purchaseType, setPuchaseType] = useState();
  const [gst, setGst] = useState();
  const [vendor, setVendor] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [editId, setEditId] = useState();
  const [editModal, setEditModal] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const newContact = {
      productName: name,
      productDescription: description,
      price: price,
      gst: gst,
      category: category,
      vendor: vendor,
      purchaseType:purchaseType
      
    };
    console.log(newContact);

    const putCartData = async (productId) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/products/${productId}`,
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

  const nameChange = (e) => {
    setName(e.target.value);

  }

  const descriptionChange = (e) => {
    setDescription(e.target.value);

  }
  const gstChange = (e) => {
    setGst(e.target.value);

  }
  const priceChange = (e) => {
    setPrice(e.target.value);

  }
  const purchaseTypeChange = (e) => {
    setPuchaseType(e.target.value);

  }
  const vendorChange = (e) => {
    setVendor(e.target.value);

  }
  const categoryChange = (e) => {
    setCategory(e.target.value);

  }







  // -------for refersh page when delete item and  this function is called in the delete handler

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
      console.log("Cart returned the data: ", token);
      console.log("data is" + JSON.stringify(response.data.response));
      setContacts(response.data.response);
    } catch (error) {
      console.log(">>>>>>>>>>> error is ", error);
    }
  }

  const deleteHandler = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/products/${productId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      CartData();
      console.log("deleted", response);
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
      name: "ProductId",
      selector: (row) => row.productId,
    },
    {
      name: "Product Name",
      selector: (row) => row.productName,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
    },

    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
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
            showDetailHandler(row.productId);
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
            deleteHandler(row.productId);
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
            setEditId(row.productId);
            setEditModal(true)
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
        <ModalHeader style={{ color: "green" }}>
          Product extra Details
        </ModalHeader>
        <ModalBody>
          <h4>Product Description : {filtered[0]?.productDescription}</h4>
          <h4>Price : {filtered[0]?.price}</h4>
          <h4>Gst : {filtered[0]?.gst}</h4>
          <h4>Purchase Type : {filtered[0]?.purchaseType}</h4>
          <h4>Vendor : {filtered[0]?.vendor}</h4>
        </ModalBody>
      </Modal>

      <Modal size="lg" isOpen={editModal} toggle={() => setEditModal(!editModal)}>
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
              <label for="exampleInputEmail1">Name :</label>
              <input
                type="text"
                
                name="productName"
                className="form-control"
                id="productName"
                aria-describedby="emailHelp"
                placeholder="Name "
                onChange={nameChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Description :</label>
              <input
                type="text"
                
                name="productDescription"
                className="form-control"
                id="productDescription"
                aria-describedby="emailHelp"
                placeholder="Description "
                onChange={descriptionChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Category :</label>
              <input
                type="text"
               
                name="category"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Category "
                onChange={categoryChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Price :</label>
              <input
                type="number"
               
                name="price"
                className="form-control"
                id="price"
                aria-describedby="emailHelp"
                placeholder="price "
                onChange={priceChange}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail1">Gst :</label>
              <input
                type="number"
               
                name="gst"
                className="form-control"
                id="gst"
                aria-describedby="emailHelp"
                placeholder="gst "
                onChange={gstChange}
              />
            </div>

         

            <div className="form-group">
              <label for="exampleInputEmail1">Vendor :</label>
              <input
                type="text"
         
                name="vendor"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Vendor  "
                onChange={vendorChange}
              />
            </div>
            <div>
              <label for="cars">Purchase Type:</label>

              <select
                type="text"
               
                name="purchaseType"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Purchase Type "
                onChange={purchaseTypeChange}
              >
                 <option value="none" selected disabled >--Select--</option>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
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

export default ListStyle;
