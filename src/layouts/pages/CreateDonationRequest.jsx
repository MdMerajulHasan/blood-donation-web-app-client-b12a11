import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [status, setStatus] = useState("");
  const [upazilasInSelect, setUpazilasInSelect] = useState([]);

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  useEffect(() => {
    axiosSecure
      .get(`/user-status?email=${user?.email}`)
      .then((res) => setStatus(res.data))
      .catch((error) => alert(error.message));
  }, [axiosSecure, user]);

  useEffect(() => {
    fetch("/subDistricts.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  const { register, handleSubmit, control, reset } = useForm();

  //after selecting district in the form this will update every time
  const district = useWatch({ control, name: "recipientDistrict" });

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

  const handleRequest = (data) => {
    axiosSecure
      .post("/create-donation-request", data)
      .then((res) => {
        if (res.data.insertedId) {
          alert("Your Request Created!");
          reset();
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="bg-base-200 space-y-2 md:space-y-5 py-1 md:py-5 rounded-md">
      <h2 className="text-red-600 text-2xl md:text-4xl font-bold text-center">
        Donation Request
      </h2>
      <form
        onSubmit={handleSubmit(handleRequest)}
        className="space-y-2 md:space-y-5"
      >
        <div className="flex flex-col md:px-2 md:flex-row gap-2 md:gap-5 justify-center items-center">
          <div className="w-11/12 md:w-1/2">
            {/* Requester Name */}
            <legend className="fieldset-legend">Requester Name</legend>
            <input
              className="input w-full"
              type="text"
              {...register("requesterName")}
              value={`${user?.displayName}`}
              placeholder={`${user?.displayName}`}
            />
            {/* Requester Email */}
            <legend className="fieldset-legend">Requester Email</legend>
            <input
              className="input w-full"
              type="email"
              {...register("requesterEmail")}
              value={`${user?.email}`}
              placeholder={`${user?.email}`}
            />
            {/* Recipient Name */}
            <legend className="fieldset-legend">Recipient Name</legend>
            <input
              className="input w-full"
              type="text"
              required
              {...register("recipientName")}
              placeholder="Name of The Recipient"
            />
            {/* Recipient District */}
            <legend className="fieldset-legend">Recipient District</legend>
            <select
              {...register("recipientDistrict")}
              className="select appearance-none w-full"
              required
            >
              <option value="">Select Recipient District</option>
              {districts.map((district) => (
                <option key={district.id}>{district.name}</option>
              ))}
            </select>
            {/* Recipient Upazila */}
            <legend className="fieldset-legend">Recipient Upazila</legend>
            <select
              {...register("recipientUpazila")}
              className="select appearance-none w-full"
              required
            >
              <option value="">Select Recipient Upazila</option>
              {upazilasInSelect.map((upazila) => (
                <option key={upazila.id}>{upazila.name}</option>
              ))}
            </select>
          </div>
          <div className="w-11/12 md:w-1/2">
            {/* Hospital Name */}
            <legend className="fieldset-legend">Hospital Name</legend>
            <input
              className="input w-full"
              type="text"
              required
              {...register("hospitalName")}
              placeholder="Hospital Name"
            />
            {/* Hospital Full Address */}
            <legend className="fieldset-legend">Full Address</legend>
            <input
              className="input w-full"
              required
              type="text"
              {...register("fullAddress")}
              placeholder="Hospital Address"
            />
            {/* Blood Group */}
            <legend className="fieldset-legend">Blood Group</legend>
            <select
              {...register("bloodGroup")}
              className="select appearance-none w-full"
              required
            >
              <option value="">Select Which Group Need</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {/* Donation Date */}
            <legend className="fieldset-legend">Donation Date</legend>
            <input
              type="date"
              required
              {...register("donationDate")}
              className="input w-full"
            />
            {/* Donation Time */}
            <legend className="fieldset-legend">Donation Time</legend>
            <input
              type="time"
              required
              {...register("donationTime")}
              className="input w-full"
            />
          </div>
        </div>
        <div className="w-11/12 md:w-auto mx-auto md:mx-2">
          <legend className="fieldset-legend">Message</legend>
          <textarea
            className="textarea w-full"
            required
            {...register("donationMessage")}
            placeholder="Write Details Why You Need Bloods."
          ></textarea>
        </div>
        {status === "active" && (
          <button
            type="submit"
            className="bg-linear-to-br mx-auto from-red-600 to-red-300 text-white lg:py-1 w-11/12 md:w-40 lg:w-52 border font-bold md:text-lg border-white rounded-md flex gap-2 justify-center items-center"
          >
            Request
          </button>
        )}
      </form>

      <button className="bg-linear-to-br mx-auto from-red-600 to-red-300 text-white lg:py-1 w-11/12 md:w-40 lg:w-52 border font-bold md:text-lg border-white rounded-md flex gap-2 justify-center items-center">
        Blocked
      </button>
    </div>
  );
};

export default CreateDonationRequest;
