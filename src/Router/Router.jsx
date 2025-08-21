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
import Section2serverID from '../Pages/APPointment/Section2serverID.jsx';
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
          element:<Privateroutes><APPointment /></Privateroutes>
        },
        {
          path:'/services/:id',
          element:<Privateroutes><Section2serverID></Section2serverID></Privateroutes>
        }
    ]
  },
]);

export default router;

