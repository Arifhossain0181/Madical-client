import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from '../Layout/MainLayout'
import Home from '../Layout/Home'
import DoctorsViews from '../Pages/Shared/Section/DoctorsViews/DoctorsViews'
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
        }
    ]
  },
]);

export default router;

