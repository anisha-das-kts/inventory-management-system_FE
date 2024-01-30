import React from 'react';
// import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
// import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import * as GoIcons from 'react-icons/go';
import * as FaIcons from 'react-icons/fa';


export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName:'nav',
   


  },
  {
    title: 'Inventory',
    path: '/product',
    icon: <RiIcons.RiProductHuntFill />,
   
    cName:'nav',

  },
 
 
  {
    title: 'Customer',
    path: '/customer',
    icon: <MdIcons.MdPersonAddAlt1 />,
    cName:'nav',

  },
  {
    title: "Book Ordering",
    path: "/ordering",
    icon: < MdIcons.MdAddShoppingCart/>,
    cName:"nav",
  },
  {
    title: 'User Management',
    path: '/management',
    icon: <FaIcons.FaUsers />,
    cName:'nav',


  },
  {
    title: "My Orders",
    path: "/myorders",
    icon: <
    RiIcons.RiShoppingCartFill/>,
    cName:"nav",
  },
  {
    title: 'Sales',
    path: '/sales',
    icon: <GoIcons.GoGraph />,
    cName:'nav',


  },
  {
    title: 'Employees',
    path: '/employee',
    icon: <MdIcons.MdPersonAddAlt1/>,
    cName:'nav',


  },
  {
    title: 'Logout',
    path: '/',
    icon: <MdIcons.MdLogout/>,
    cName:'nav',


  },
    
];