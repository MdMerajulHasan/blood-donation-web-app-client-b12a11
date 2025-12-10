import React from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase.init";

const AuthProvider = ({ children }) => {
  // function to register user with email and password
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // function to sign in user with email and password
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   function to update an existing user
  const updateUser = (updatedUserData) => {
    return updateProfile(auth.currentUser, updatedUserData);
  };

  const authInfo = { registerUser, signInUser, updateUser };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
