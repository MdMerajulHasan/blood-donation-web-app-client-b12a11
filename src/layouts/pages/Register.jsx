import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router";

const Register = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  useEffect(() => {
    fetch("/subDistricts.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const password = useWatch({ control, name: "password" });

  const handleRegister = (data) => {
    // const { email, name, photo, district, upazila, password, retypedPassword } =
    // data;
    console.log(data);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-1 md:gap-5 justify-center items-start mt-2 md:mt-10 w-11/12 lg:w-4/5 mx-auto">
      <div className="w-11/12 mx-auto md:w-1/2">
        <h2 className="text-2xl m-0 md:text-4xl font-bold text-violet-500 text-center my-1 md:my-5">
          Register
        </h2>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-1 md:space-y-5 overflow-hidden"
        >
          {/* email input */}
          <div>
            <legend className="fieldset-legend md:pt-0">Email</legend>
            <label className="input w-full validator">
              <MdOutlineEmail size={20} />
              <input
                type="email"
                {...register("email")}
                className="w-full"
                title="Give Your Email To register"
                placeholder="Give Your Mail"
                required
              />
            </label>
            <div className="validator-hint hidden text-xs font-bold">
              Enter valid email address
            </div>
          </div>
          {/* name input */}
          <div>
            <legend className="fieldset-legend">Name</legend>
            <label className="input w-full validator">
              <FaUserAlt />
              <input
                type="text"
                {...register("name")}
                required
                placeholder="Give Your Name"
                className="w-full"
                pattern="[A-Za-z][A-Za-z0-9\- ]*"
                minLength="3"
                maxLength="30"
                title="Only letters, numbers, dash or space"
              />
            </label>
            <p className="validator-hint text-xs font-bold hidden">
              Must be 3 to 30 characters
              <br />
              containing only letters, numbers, dash or space
            </p>
          </div>
          {/* image input */}
          <div>
            <legend className="fieldset-legend">Photo</legend>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full"
            />
            {errors.photo?.type === "required" && (
              <div className="validator-hint hidden text-xs font-bold">
                Upload Photo
              </div>
            )}
          </div>
          {/* blood group select */}
          <div>
            <legend className="fieldset-legend">Blood Group</legend>
            <select
              {...register("bloodGroup")}
              className="select appearance-none w-full"
            >
              <option value="">Select Your Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          {/* District select */}
          <div>
            <legend className="fieldset-legend">District</legend>
            <select
              {...register("district")}
              className="select appearance-none w-full"
            >
              <option value="">Select Your District</option>
              {districts.map((district) => (
                <option key={district.id}>{district.name}</option>
              ))}
            </select>
          </div>
          {/* Sub-district select */}
          <div>
            <legend className="fieldset-legend">Upazila</legend>
            <select
              {...register("upazila")}
              className="select appearance-none w-full"
            >
              <option value="">Select Your Upazila</option>
              {upazilas.map((upazila) => (
                <option key={upazila.id}>{upazila.name}</option>
              ))}
            </select>
          </div>
          {/* password input */}
          <div>
            <legend className="fieldset-legend">Password</legend>
            <label className="input validator w-full">
              <RiLockPasswordFill />
              <input
                type="password"
                {...register("password")}
                className="w-full"
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <p className="validator-hint hidden text-xs font-bold">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p>
          </div>
          {/* password confirm input */}
          <div>
            <legend className="fieldset-legend">Retype Password</legend>
            <label className="input w-full">
              <RiLockPasswordFill />
              <input
                type="password"
                className="w-full"
                {...register("retypedPassword", {
                  validate: (value) =>
                    value === password || "Password Didn't Matched",
                })}
                required
                placeholder="Retype Password"
                title="Retype Your Password Here"
              />
            </label>

            {errors.retypedPassword && (
              <div className="text-red-500 text-xs font-bold">
                {errors.retypedPassword?.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-violet-500 text-base md:text-xl font-bold text-white my-1 md:py-2 w-full text-center rounded-md"
          >
            Register
          </button>
        </form>
        <p className="my-1 text-[14px] md:text-base md:my-5 text-center">
          Already Have an Account?
          <Link to="/login" className="m-0 text-violet-500 font-bold">
            Login
          </Link>
        </p>
      </div>
      <div className="w-11/12 mx-auto md:w-1/2">
        <h2 className="text-2xl md:text-4xl font-bold text-violet-500 text-center my-2 md:my-5">
          Join Us
        </h2>
        <img
          className="h-[140px] md:h-[250px] lg:w-[400px] mx-auto"
          src="/src/assets/blood_donation_auth_image.jpeg"
          alt="auth image"
        />
      </div>
    </div>
  );
};

export default Register;
