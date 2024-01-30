import { faBold } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";

// import 'react-select/dist/react-select.css'

const ListStyle = ({  }) => {
  const token = localStorage.getItem("Token");
  const [detailModal, setDetailModal] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [modal, setmodal] = useState(false);
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [rentDate, setRentDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [search, setSearch] = useState();
  const [categoryValue, setCategoryValue] = useState();
  const [nameValue, setNameValue] = useState();
  const [productId, setProductId] = useState();
  const [quantityValue, setQuantityValue] = useState();
  const [contacts, setContacts] = useState([{}]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [rentalId, setRentalId] = useState();



  const changeName = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const changeCategory = (e) => {
    const value = e.target.value;
    setCategory(value);
  };
  const changeQuantity = (e) => {
    const value = e.target.value;
    setQuantity(value);
  };
  const changeRentDate = (e) => {
    const value = e.target.value;
    setRentDate(value);
  };
  const changeReturnDate = (e) => {
    const value = e.target.value;
    setReturnDate(value);
  };

 
  useEffect(() => {
    CartData();
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
      setFilteredBooks(response.data.response);
    } catch (error) {
      console.log(">>>>>>>>>>> error is ", error);
    }
  }

  const submitHandler = (e) => {
    if (quantity <= quantityValue) {
    e.preventDefault();

    const newContact = {
      productId: productId,
      issueDate: rentDate,
      returnDate: returnDate,
      userId:localStorage.getItem("UserId"),
      quantity: quantity,
      rentalStatus:"PENDING"
      
      };


      
      
    const getCartData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/rentals",
          newContact,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
       
        console.log(response);

        // CartData();
      } catch (error) {
        console.log(">>>>>>>>>>> error is ", error);
      }
    };
    getCartData();
  

  //   const putCartData = async () => {
  //     try {
  //       const response = await axios.put(
  //         `http://localhost:8080/products/${productId}/quantity/subtract/${quantity}`,
  //         { quantity, productId },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
       
  //       CartData();

      
  //     } catch (error) {
  //       console.log(">>>>>>>>>>> error is ", error);
  //     }
  //   };
  

  //   putCartData();
  }

  else {
    alert("Less Item In Inventory Than Demand")
  }
  };

  const customStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        paddingLeft: "8px", // override the cell padding for head cells
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
            borderRadius: "5px",
            
            textDecoration: "none",
            fontWeight: "bold",
            paddingTop: "5px",
            paddingLeft: "15px",
            paddingBottom: "5px",
            paddingRight: "15px",
            
            backgroundColor: "navy",
            color: "white",
          }}
          onClick={() => {
            setmodal(true);
            setCategoryValue(row.category);
            setNameValue(row.productName);
            setProductId(row.productId);
            setQuantityValue(row.quantity);
          }}
        >
          Rent
        </button>
      ),

      //   <Modal
      //   size="lg"
      //   isOpen={detailModal}
      //   toggle={() => setDetailModal(!detailModal)}
      // >
      // <ModalHeader style={{ color: "green" }}>
      //   Product extra Details
      // </ModalHeader>
      // <ModalBody>
      //   <h4>Quantity : {filtered[0]?.quantity}</h4>
      //   <h4>ProductDescription : {filtered[0]?.productDescription}</h4>
      //   <h4>Price Per Piece : {filtered[0]?.price}</h4>
      //   <h4>Gst : {filtered[0]?.gst}</h4>
      //   <h4>Purchase Type : { filtered[0]?.purchaseType}</h4>
      //   <h4>Vendor : { filtered[0]?.vendor}</h4>
      // </ModalBody>
      // </Modal >
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

  useEffect(() => {
    const result = contacts.filter((contact) => {
      return contact.productName?.toLowerCase()?.match(search?.toLowerCase());
    });
    setFilteredBooks(result);
  }, [search]);
  return (
    <div>
      <DataTable
        columns={columns}
        customStyles={customStyles}
        data={filteredBooks}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            style={{ width: "25%", borderRadius: "5px", padding: "5px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Book Here"
          />
        }
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
          <form className="d-block p-2  " onSubmit={submitHandler}>
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
                value={nameValue}
                onChange={changeName}
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
                value={categoryValue}
                onChange={changeCategory}
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
                onChange={changeQuantity}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Rent Date :</label>
              <input
                type="date"
                required="required"
                name="rentDate"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Rent Date "
                onChange={changeRentDate}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Return Date :</label>
              <input
                type="date"
                required="required"
                name="returnDate"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Return Date "
                onChange={changeReturnDate}
              />
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
    </div>
  );
};

export default ListStyle;
