import React from "react";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";

const AdminRoutes = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return;
  }
  return children;
};

export default AdminRoutes;
