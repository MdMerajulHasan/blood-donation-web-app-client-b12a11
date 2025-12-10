import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Home = () => {
  const { name } = useContext(AuthContext);
  console.log(name);
  return <div>{name}</div>;
};

export default Home;
