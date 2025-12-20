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

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "/search-donors", Component: SearchDonor },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/registration", Component: Register },
  {
    path: "/dashboard",
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
        element: <CreateDonationRequest></CreateDonationRequest>,
      },
    ],
  },
]);

export default router;
