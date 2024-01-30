import { faBold } from "@fortawesome/free-solid-svg-icons";
import React,{useState} from "react";
import DataTable from "react-data-table-component";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

// import 'react-select/dist/react-select.css'

const ListStyle = ({ contacts }) => {

  const [detailModal, setDetailModal] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const showDetailHandler = (productId) => {
    
    const filteredData = contacts.filter(
      (contact) => contact?.productId === productId
    );
    console.log(contacts)
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
        fontWeight:"bold",
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    
};
  const columns = [
   
    {
      name: "Transaction Id",
      selector: (row) => row.transactionId,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customerName,
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
      name: "Quantity",
      selector: (row) => row.quantity,
    },
    {
      name: "Total Amount",
      selector: (row) => row.totalAmount,
    },
    {
      name: "Purchase Type",
      selector: (row) => row.purchaseType,
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
      <DataTable columns={columns}
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
            <h4>Quantity : {filtered[0]?.quantity}</h4>
            <h4>ProductDescription : {filtered[0]?.productDescription}</h4>
            <h4>Price Per Piece : {filtered[0]?.price}</h4>
            <h4>Gst : {filtered[0]?.gst}</h4>
            <h4>Purchase Type : { filtered[0]?.purchaseType}</h4>
            <h4>Vendor : { filtered[0]?.vendor}</h4>
          </ModalBody>
        </Modal>
    
    </div>
  );
};

export default ListStyle;
