import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../layouts/pages/Login";
import Register from "../layouts/pages/Register";
import Home from "../layouts/pages/Home";
import SearchDonor from "../layouts/pages/SearchDonor";
import Dashboard from "../layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";

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
  },
]);

export default router;
