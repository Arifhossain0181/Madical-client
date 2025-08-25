import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from '../Layout/MainLayout'
import Home from '../Layout/Home'
import Login from '../Pages/Login/Login'
import Registation from '../Pages/Registation/Registation'
import Privateroutes from './Privateroutes'
import Secret from '../Pages/Shared/Secret/Secret'
import DoctorsViews from '../Pages/Shared/Section/DoctorsViews/DoctorsViews'
import APPointment from '../Pages/APPointment/APPointment.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';
import User from '../../src/Pages/APPointment/User.jsx'
import Section2serverID from '../Pages/APPointment/Section2serverID.jsx';
import UPdatecart from '../Pages/APPointment/UPdatecart.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },{
          path:'/doctorsviews/:id',
          element:<DoctorsViews></DoctorsViews>
        },{
          path:'/login',
          element:<Login></Login>
        },{
          path:'/register',
          element:<Registation></Registation>
        },{
          path:'/secret',
          element :<Privateroutes><Secret /></Privateroutes>
        },{
          path:'/appointment',
          element:<APPointment />
        },
        {
          path:'/services/:id',
          element:<Section2serverID></Section2serverID>
        },{
          path:'/user',
          element:<Privateroutes><User></User></Privateroutes>
        },
        {
          path:'/updatecart/:id',
          element:<Privateroutes><UPdatecart></UPdatecart></Privateroutes>,
          loader:({params})=>fetch(`http://localhost:5000/mycart/${params.id}`)
        }
    ]
  },
  {
    path:'/dashboard',
    element:<Dashboard></Dashboard>
  }
]);

export default router;

