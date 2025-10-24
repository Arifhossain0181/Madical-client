import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Layout/Home";
import Login from "../Pages/Login/Login";
import Registation from "../Pages/Registation/Registation";
import Privateroutes from "./Privateroutes";
import Secret from "../Pages/Shared/Secret/Secret";
import DoctorsViews from "../Pages/Shared/Section/DoctorsViews/DoctorsViews";
import APPointment from "../Pages/APPointment/APPointment.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import User from "../Pages/APPointment/User.jsx";
import Section2serverID from "../Pages/APPointment/Section2serverID.jsx";
import Booing from "../Dashboard/Booing.jsx";
import UPdatecart from "../Pages/APPointment/UPdatecart.jsx";
import ManageDoctors from "../Dashboard/ManageDoctors.jsx";

// Dashboard child pages
import APPointmentlist from "../Dashboard/APPointmentlist.jsx";
import Rejectlist from "../Dashboard/Rejectlist.jsx";
import Doctorregistrations from "../Dashboard/Doctorregistrations.jsx";
import APProvelist from "../Dashboard/APProvelist.jsx";
import History from "../Dashboard/History.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/doctorsviews/:id", element: <DoctorsViews /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Registation /> },
      {
        path: "/secret",
        element: (
          <Privateroutes>
            <Secret />
          </Privateroutes>
        ),
      },
      { path: "/appointment", element: <APPointment /> },
      { path: "/services/:id", element: <Section2serverID /> },
      {
        path: "/user",
        element: (
          <Privateroutes>
            <User />
          </Privateroutes>
        ),
      },
      {
          path: "/doctorregistrations", 
          element: <Doctorregistrations />

      },
      {
        path: "/updatecart/:id",
        element: (
          <Privateroutes>
            <UPdatecart />
          </Privateroutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/mycart/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Privateroutes>
        <Dashboard />
      </Privateroutes>
    ), // Protect the dashboard
    children: [
      { path: "user", element: <User /> },
      { path: "booking", element: <Booing /> },
      { path: "appointmentlist", element: <APPointmentlist /> },
      { path: "rejectlist", element: <Rejectlist /> },
     
      { path: "approvelist", element: <APProvelist /> },
      { path: "history", element: <History /> },
      { path: "managedoctor", element: <ManageDoctors /> },
      { path: "appointment", element: <APPointmentlist /> }, // Optional default page when /dashboard is accessed
    ],
  },
]);

export default router;
