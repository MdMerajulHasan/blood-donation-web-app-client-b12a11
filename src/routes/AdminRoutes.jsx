import React from "react";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";
import Forbidden from "../layouts/pages/Forbidden";

const AdminRoutes = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default AdminRoutes;
