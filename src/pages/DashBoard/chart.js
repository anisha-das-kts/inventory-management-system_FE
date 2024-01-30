import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJs,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
// import card from "./card";
ChartJs.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);
var today = new Date();

// Getting full month name (e.g. "June")
var month = today.toLocaleString('default', { month: 'long' });


const LineChart = () => {
  const token = localStorage.getItem('Token');
  const [data, setData] = useState({
    labels: [],
    datasets: [
      //  labels: [1,2,3,4, 5,6],
      //  datasets: [
      {
        label: "first Dataset",
        backdropColor: "blue",
        backdropPadding:"2 rem",

        data: [1, 2, 3, 4, 5, 6],
        backgroundColor: "yellow",
        borderColor: "red",
        tension: 0.4,
        

      },

    ],
  });

  const options = {
  
    type: 'line',
    data: data,
    title: {
      display: true,
      text:"Monthly Transactions"
    },
   
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Transactions",
            padding: {
             
                top: 10,
                bottom: 30
            
            },
            fontSize:2
          }
        },
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Dates of Month",
            padding: {
             
              top: 30,
              bottom: 30
          
          },
          }
        }
      }
    
  }
 
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
        setData({
          labels: response.data.response.graph.map((item) =>  +item.date ),
          datasets: [
            {
              label: (month +" Transactions"),
              data: response?.data.response.graph.map((item) => +item.sales ),
              backgroundColor: "yellow",
              borderColor: "red",
              tension: 0.5,
              Filler: true,
            },
          ],
        });
         
        
      } catch (error) {
        console.log(">>>>>>>>>>> error is ", error);
      }
    }
    getCartData();
  }, []);

  // useEffect(() => {
  //   const loadData = async () => {
  //     await axios
  //       .get("http://localhost:8080/transactions/current-month/sales")
  //       .then((res) => {
  //         setData({
  //           labels: res.data.graph.map((item) => +item.Date),
  //           datasets: [
  //             {
  //               label: "Monthly Transactions ",
  //               data: res?.data.graph.map((item) => +item.sales),
  //               backgroundColor: "blue",
  //               borderColor: "red",
  //               tension: 0.4,
  //               Filler: true,
  //             },
  //           ],
  //         });
  //       });
  //   };
  //   loadData();
  // }, []);
  return (
    <div>
      <Line data={data} options={options}  style={{ width: "55vw", height: "55vh" }}></Line>
    </div>
  );
};

export default LineChart;
