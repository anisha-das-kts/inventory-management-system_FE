import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard/Dash_Board";
import Inventory from "./pages/Products/Product";
import Sales from "./pages/Transaction/Sales";
// import Inventory from "./pages/Inventory/Inventory";
import Customer from "./pages/customer/Customer";
import Login from "./pages/Login/firstPage";
import Logout from "./pages/LogOut/logout";
import SignUp from "./pages/Login/SignUp";

import OrderingBook from "./pages/OrderingBook/main";
import UserManagement from "./pages/User Management/userManagement";
import Myorder from "./pages/MyOrders/Myorder";

import Employee from "./pages/Employee/Employee";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const User_Type = {
  O: "O",
  S: "S",
  U: "U",
};
const Current_User_Type = localStorage.getItem("Role");
function RouteFiles() {
  const Navigate = useNavigate;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>

          <Route
            exact
            path="/dashboard"
            element={
              <AdminElement>
                <DashBoard />
              </AdminElement>
            }
          />

          <Route
            path="/product"
            element={
              <AdminElement>
                <Inventory />
              </AdminElement>
            }
          />
          <Route
            path="/customer"
            element={
              <AdminElement>
                <Customer />
              </AdminElement>
            }
          />
          <Route
            path="/sales"
            element={
              <AdminElement>
                <Sales />
              </AdminElement>
            }
          />
          <Route
            path="/management"
            element={
              <AdminElement>
                <UserManagement />
              </AdminElement>
            }
          />
          <Route
            path="/myorders"
            element={
              <UserElement>
                <Myorder />
              </UserElement>
            }
          />

          <Route
            path="/ordering"
            element={
              <UserElement>
                <OrderingBook />
              </UserElement>
            }
          />

          <Route
            path="/employee"
            element={
              <OwnerElement>
                <Employee />
              </OwnerElement>
            }
          />

          <Route path="/" element={<Logout />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function AdminElement({ children }) {
  if (Current_User_Type == "O" || Current_User_Type == "S")
    return <> {children}</>;
  else return <>Page Not Found </>;
}

function UserElement({ children }) {
  if (Current_User_Type == "U") return <> {children}</>;
  else return <>Page Not Found </>;
}

function OwnerElement({ children }) {
  if (Current_User_Type == "O") return <> {children}</>;
  else return <>Page Not Found </>;
}

export default RouteFiles;
