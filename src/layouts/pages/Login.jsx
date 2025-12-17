import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signInUser, setUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((currentUser) => {
        setUser(currentUser.user);
        navigate(location?.state || "/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-1 md:gap-5 justify-center items-start mt-2 md:mt-10 w-11/12 lg:w-4/5 mx-auto">
      <div className="w-11/12 mx-auto md:w-1/2">
        <h2 className="text-2xl md:text-4xl font-bold text-violet-500 text-center my-1 md:my-5">
          Login
        </h2>
        <form className="space-y-1 md:space-y-5">
          <div>
            <legend className="fieldset-legend md:pt-0">Email</legend>
            <label className="input w-full validator">
              <MdOutlineEmail size={20} />
              <input
                type="email"
                {...register("email")}
                className="w-full"
                title="Give Email That You Have Given To Register"
                placeholder="Give Your Mail"
                required
              />
            </label>
            <div className="validator-hint hidden text-sm md:text-base font-bold">
              Enter valid email address
            </div>
          </div>
          <div>
            <legend className="fieldset-legend">Password</legend>
            <label className="input w-full">
              <RiLockPasswordFill />
              <input
                type="password"
                {...register("password")}
                className="w-full"
                required
                placeholder="Type Your Password"
                title="Type Password That Was Created By You"
              />
            </label>
          </div>
          <p className="text-violet-500 font-bold text-xs md:text-sm text-end w-full">
            <a href=""> Forgot Password?</a>
          </p>
          <button
            onClick={handleSubmit(handleLogin)}
            className="bg-violet-500 text-base md:text-xl font-bold text-white py-1 md:py-2 w-full text-center rounded-md"
          >
            Login
          </button>
        </form>
        <p className="my-1 text-[14px] md:text-base md:my-5 text-center">
          Haven't Any Account?
          <Link
            state={location?.state}
            to="/registration"
            className="m-0 text-violet-500 font-bold"
          >
            Register Now
          </Link>
        </p>
      </div>
      <div className="w-11/12 mx-auto md:w-1/2">
        <h2 className="text-2xl md:text-4xl font-bold text-violet-500 text-center my-2 md:my-5">
          Welcome Back
        </h2>
        <img
          className="h-[140px] md:h-[250px] md:w-[400px] mx-auto"
          src="/src/assets/blood_donation_auth_image.jpeg"
          alt="auth image"
        />
      </div>
    </div>
  );
};

export default Login;
