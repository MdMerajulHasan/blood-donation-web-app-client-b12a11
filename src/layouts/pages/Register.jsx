import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import authImage from "../../assets/blood_donation_auth_image.jpeg";

const Register = () => {
  // getting registration function from firebase
  const { registerUser, setUser, updateUser } = useAuth();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [upazilasInSelect, setUpazilasInSelect] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const axiosInstance = useAxios();

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

  // after selecting district in the form this will update every time
  const district = useWatch({ control, name: "district" });
  // tracking password to validate password is equal to retypedPassword
  const password = useWatch({ control, name: "password" });

  // based on district making the list of the upazilas
  useEffect(() => {
    // getting the district data which is selected
    const selectedDistrict = districts.filter((d) => d.name === district);

    // taking the district id from district data
    const districtId = selectedDistrict[0]?.id;

    // getting the array of the upazila list
    const newUpazilas = upazilas.filter((u) => u.district_id === districtId);

    // updating upazilas in select
    setUpazilasInSelect(newUpazilas);
  }, [districts, district, upazilas]);

  const handleRegister = async (data) => {
    const { email, name, photo, password, bloodGroup, district, upazila } =
      data;

    try {
      // getting the image data from form
      const profileImage = photo?.[0];

      // registering user in firebase
      const currentUser = await registerUser(email, password);
      //declaring and setting phot url "" initially
      let photoURL = "";

      if (photo?.length > 0) {
        // storing the form data in FormData
        const formData = new FormData();
        formData.append("image", profileImage);

        // image api url to upload image in imgBB
        const image_API_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_imagbb_api
        }`;

        // using axios uploading photo and getting url
        const imageRes = await axios.post(image_API_Url, formData);
        // getting the url of uploaded photo
        photoURL = imageRes.data.data.display_url;
      }

      // making userInfo object to store in database and giving data to firebase
      const userInfo = {
        name,
        email,
        photo: photoURL,
        bloodGroup,
        district,
        upazila,
      };

      // saving data to database
      axiosInstance
        .post("/users", userInfo)
        .then((res) => {
          if (res.data.insertedId) {
            alert("User Registered Successfully!");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
      // using function to update user in firebase
      updateUser({ displayName: name, photoURL: userInfo.photo })
        .then(() => {
          setUser(currentUser.user);
          navigate(location.state || "/");
        })
        .catch((error) => alert(error.message));
    } catch (error) {
      alert(error.message);
    }
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
              {...register("photo")}
              className="file-input w-full"
            />
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
          {/* upazila select */}
          <div>
            <legend className="fieldset-legend">Upazila</legend>
            <select
              {...register("upazila")}
              className="select appearance-none w-full"
            >
              <option value="">Select Your Upazila</option>
              {upazilasInSelect.map((upazila) => (
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
          <Link
            state={location?.state}
            to="/login"
            className="m-0 text-violet-500 font-bold"
          >
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
          src={authImage}
          alt="auth image"
        />
      </div>
    </div>
  );
};

export default Register;
