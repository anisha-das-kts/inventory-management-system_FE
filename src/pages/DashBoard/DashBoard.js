import React, { useState, useEffect } from "react";
import LargeCard from "./Cards/LargeCard";
import MediumCards from "./Cards/MediumCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

import LineChart from "./chart";

import { CSVLink } from "react-csv";
import "./DashBoard.css";

import axios from "axios";
const DashBoard = () => {
  const token = localStorage.getItem("Token");
  const [monthUserData, setMonthUserData] = useState([]);
  const [itemArray, setItemArray] = useState([]);
  const [item, setItem] = useState();
  const [lowItem, setLowItem] = useState();
  const [vendor, setVendor] = useState();
  const [product, setProduct] = useState();
  const [outStock, setOutStock] = useState();
  const [customer, setCustomer] = useState();
  const [customerArray, setCustomerArray] = useState([]);

  const [totalAmountDaily, setTotalAmountDaily] = useState(0);
  const [transaction, totalTransactions] = useState([]);

  const [max, setMax] = useState(0);
  const [lastTransaction, setLastTransaction] = useState();
  const [listArray, setListArray] = useState();
  // const[size,setSize]=useState("");

  const [size, setSize] = useState();
  useEffect(() => {
    async function getCartData() {
      try {
        const response = await axios.get(
          "http://localhost:8080/transactions/current-month/sales",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("Cart returned the data: ", window.token);

      
        setSize(response.data.response.size);
        setMonthUserData(response.data.response.transactionDetails);
        if (monthUserData.length <= 5) {
          const arrayList = [];

          monthUserData.map((item) => {
            arrayList.push(item);
          });
          setListArray(arrayList);

          // console.log(listArray);
        } else if (monthUserData.length > 5) {
          var length = monthUserData.length;
          const listStartPoint = length - 5;
          const arrayList = [];
          const arrayList2 = [];

          for (let i = listStartPoint; i < length; i++) {
            arrayList.push(monthUserData[i]);
          }
          setListArray(arrayList);

          // console.log(listArray);
        }

        getTransactionData();
      } catch (error) {
        console.log(">>>>>>>>>>> error is ", error);
      }
    }
    getCartData();
  }, []);

  useEffect(() => {
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
        // console.log("Cart returned the data: ", token);
        console.log("data is", response.data.response);
        setItemArray(response.data.response);
      } catch (error) {
        console.log(">>>>>>>>>>> error is ", error);
      }
    }

    CartData();
  }, []);

  useEffect(() => {
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
       
        setCustomerArray(response.data.response);
        console.log(response.data);
        // console.log(productData[1].description);
      } catch (error) {
        console.log(">>>>>>>>>>> error is ", error);
      }
    }
    CartData();
  },[]);
  console.log(customerArray.length);

  const getCustomer = () => {
    setCustomer(customerArray.length);
  };

  const getTransactionData = () => {
    const totalAmountArray = monthUserData.map((item, index) => {
      return item.totalAmount;
    });
    let result = 0;
    let count = 0;
    for (let i = 0; i < totalAmountArray.length; i++) {
      result = result + totalAmountArray[i];
      if (totalAmountArray[i] > 0) {
        count++;
      }
    }
    let maximum = Math.max(...totalAmountArray);
    setMax(maximum);
    totalTransactions(count);
    setTotalAmountDaily(result);
  };

  const getWeeklyData = () => {
    const totalAmountArray = monthUserData.map((item, index) => {
      return item.totalAmount;
    });
    let result = 0;
    let count = 0;

    for (let i = totalAmountArray.length - 1; i >= 0; i++) {
     
      if (totalAmountArray[i] > 0) {
        setLastTransaction(totalAmountArray[i]);

        count = i;
        break;
      }
    }

    // for (let i = 0; i < 7; i++)
    // {
    //   result=result+totalAmountArray[count-i-1]
    // }
  };

  useEffect(() => {
    getTransactionData();
    getWeeklyData();
    getCardDetail();
    getCustomer();
  });

  const getCardDetail = () => {
    setVendor(itemArray.length);
    setProduct(itemArray.length);
    let itemValue = 0;
    let lowItemValue = 0;
    let outStockValue = 0;

    for (let i = 0; i < itemArray.length; i++) {
      itemValue = itemValue + itemArray[i].quantity;
      if (itemArray[i].quantity < 5) {
        lowItemValue++;
      }
      if (itemArray[i].quantity == 0) {
        outStockValue++;
      }
    }

    setItem(itemValue);
    setOutStock(outStockValue);
    setLowItem(lowItemValue);
  };

  return (
    <div>
      <div className="dashBoardStyle">
        <div
          className="cards-medium"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "12vh",
            marginLeft: "2rem",
            marginBottom: "2rem",
            marginRight: "2rem",
          }}
        >
          <MediumCards
            text="Inventory"
            text1="Total Item : "
            text2="Low Item : "
            data1={item}
            data2={lowItem}
          />
          <MediumCards
            text="Users"
            text1="Total Customers : "
            text2="Total Vendors : "
            data2={vendor}
            data1={customer}
          />
          <MediumCards
            text="Products"
            text1="Total Products : "
            text2="Out of Stock : "
            data1={product}
            data2={outStock}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }} className="dashBoardBody">
          <div>
            <div
              className="dashBoard-charts"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0vh",
                marginLeft: "2rem",
                // marginBottom: "2rem",
                marginRight: "2rem",
              }}
            >
              <LineChart className="dashBoard-monthChart" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                style={{
                  borderRadius: "8px",
                  background: "navy",
                  marginLeft: "100px",
                  marginBottom: "2px",
                  cursor: "pointer",
                  padding: "0.35rem",
                }}
              >
                <CSVLink style={{ color: "white" }} data={monthUserData}>
                  {" "}
                  Download Report
                </CSVLink>
              </button>
            </div>
          </div>

          <div
            className="cards-large"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              marginTop: "1vh",
              marginLeft: "5rem",
              marginBottom: "2rem",
              marginRight: "2rem",
            }}
          >
            <LargeCard
              icon={faChartLine}
              text="Total Sales : "
              data={totalAmountDaily}
            />
            <LargeCard text="No. of Purchase :  " data={transaction} />
            <LargeCard text="Last Transaction : " data={lastTransaction} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
