import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { useForm } from "react-hook-form";
import { FaHouseUser } from "react-icons/fa";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    isLoading: isProfileLoading,
    data: userData = {},
    refetch,
  } = useQuery({
    queryKey: ["user-own-profile-data"],
    queryFn: async () => {
      const res = await axiosSecure
        .get(`/user?email=${user?.email}`)
        .catch((err) => alert(err.message));
      return res?.data;
    },
  });

  const { register, handleSubmit } = useForm();

  const handleUpdateUserData = (data) => {
    const updatedData = {
      name: data.userName,
      photo: data.userPhoto,
      district: data.userDistrict,
      upazila: data.userUpazila,
      bloodGroup: data.userBloodGroup,
    };
    axiosSecure
      .patch(`/user?email=${user?.email}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount) {
          alert("Data Updated");
          refetch();
        }
        setEdit(!edit);
      })
      .catch((err) => alert(err.message));
  };

  if (isProfileLoading) {
    return <Loading></Loading>;
  } else {
    return (
      <div className="bg-base-100 w-11/12 mx-auto space-y-2 md:space-y-5 py-2 md:py-5 mt-5 md:mt-10 rounded-md">
        <h2 className="text-red-600 text-2xl md:text-4xl font-bold text-center">
          Donor Profile
        </h2>
        {userData?.photos ? (
          <img
            className="w-16 md:w-32 h-16 md:h-32 rounded-full mx-auto border border-red-600"
            src={userData?.photo}
            alt="User Image"
          />
        ) : (
          <div>
            <FaHouseUser
              className="mx-auto p-2 rounded-full border border-red-600"
              size={50}
            />
          </div>
        )}
        <div className="flex flex-col justify-center items-center">
          {!edit && (
            <button
              onClick={() => setEdit(!edit)}
              className={`bg-linear-to-br mx-auto from-red-600 to-red-300 text-white lg:py-1 w-11/12 md:w-40 lg:w-52 border font-bold md:text-lg border-white rounded-md flex gap-2 justify-center items-center`}
            >
              Edit
            </button>
          )}
          <form
            onSubmit={handleSubmit(handleUpdateUserData)}
            className="space-y-2 w-full"
          >
            <div className="flex flex-col w-full px-2 gap-2 justify-center">
              {/* User Name */}
              <legend className="fieldset-legend">User Name</legend>
              <input
                className="input w-full"
                type="text"
                {...register("userName")}
                defaultValue={`${userData?.name}`}
                readOnly={!edit}
                placeholder={`${userData?.name}`}
              />
              {/* User Email */}
              <legend className="fieldset-legend">User Email</legend>
              <input
                className="input w-full"
                readOnly
                placeholder={`${user?.email}`}
              />
              {/* User Photo */}
              <legend className="fieldset-legend">User Photo</legend>
              <input
                className="input w-full"
                type="url"
                {...register("userPhoto")}
                defaultValue={`${userData?.photo}`}
                readOnly={!edit}
                placeholder={`${userData?.photo}`}
              />
              {/* User District */}
              <legend className="fieldset-legend">User District</legend>
              <input
                className="input w-full"
                type="text"
                {...register("userDistrict")}
                defaultValue={`${userData?.district}`}
                readOnly={!edit}
                placeholder={`${userData?.district}`}
              />
              {/* User Upazila */}
              <legend className="fieldset-legend">User Upazila</legend>
              <input
                className="input w-full"
                type="text"
                {...register("userUpazila")}
                defaultValue={`${userData?.upazila}`}
                readOnly={!edit}
                placeholder={`${userData?.upazila}`}
              />
              {/* User Blood Group */}
              <legend className="fieldset-legend">Blood Group</legend>
              <input
                className="input w-full"
                type="text"
                {...register("userBloodGroup")}
                defaultValue={`${userData?.bloodGroup}`}
                readOnly={!edit}
                placeholder={`${userData?.bloodGroup}`}
              />
            </div>
            {edit && (
              <button
                type="submit"
                className={`bg-linear-to-br mx-auto from-red-600 to-red-300 text-white lg:py-1 w-11/12 md:w-40 lg:w-52 border font-bold md:text-lg border-white rounded-md flex gap-2 justify-center items-center`}
              >
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
};

export default Profile;
