import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../layouts/pages/Login";
import Register from "../layouts/pages/Register";
import Home from "../layouts/pages/Home";
import SearchDonor from "../layouts/pages/SearchDonor";
import Dashboard from "../layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../layouts/pages/DashboardHome";
import CreateDonationRequest from "../layouts/pages/CreateDonationRequest";
import MyDonationRequests from "../layouts/pages/MyDonationRequests";
import Profile from "../layouts/pages/Profile";
import DonationRequests from "../layouts/pages/DonationRequests";
import Request from "../layouts/pages/Request";
import Update from "../layouts/pages/Update";
import Error404 from "../layouts/pages/Error404";
import Users from "../layouts/pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error404></Error404>,
    children: [
      { index: true, Component: Home },
      { path: "/search-donors", Component: SearchDonor },
      {
        path: "/donation-requests",
        element: <DonationRequests></DonationRequests>,
      },
      {
        path: "/request/:id",
        element: (
          <PrivateRoute>
            <Request></Request>,
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/registration", Component: Register },
  {
    path: "/dashboard",
    errorElement: <Error404></Error404>,
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <DashboardHome></DashboardHome> },
      {
        path: "/dashboard/create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>,
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <MyDonationRequests></MyDonationRequests>,
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/update/:id",
        element: <Update></Update>,
      },
      {
        path: "/dashboard/all-users",
        element: <Users></Users>,
      },
    ],
  },
]);

export default router;
