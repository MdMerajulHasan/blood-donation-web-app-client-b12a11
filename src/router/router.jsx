import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../layouts/pages/Login";
import Register from "../layouts/pages/Register";
import Home from "../layouts/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "/login", Component: Login },
      { path: "/registration", Component: Register },
    ],
  },
]);

export default router;
