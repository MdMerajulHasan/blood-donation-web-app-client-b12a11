import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxios from "../../hooks/useAxios";

const SearchDonor = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [show, setShow] = useState(false);
  const [upazilasInSelect, setUpazilasInSelect] = useState([]);
  const [donors, setDonors] = useState(null);
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

  const { register, handleSubmit, control } = useForm();

  // after selecting district in the form this will update every time
  const district = useWatch({ control, name: "district" });

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

  const handleSearch = (data) => {
    if (data) {
      axiosInstance
        .get("/users", { params: data })
        .then((res) => {
          setDonors(res.data);
          setShow(true);
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <div>
      <div className="bg-base-200 w-11/12 mx-auto space-y-2 md:space-y-5 py-2 md:py-5 mt-5 md:mt-10 rounded-md">
        <h2 className="text-red-600 text-4xl font-bold text-center">
          Search Donor
        </h2>

        <form
          onSubmit={handleSubmit(handleSearch)}
          className="space-y-2 md:space-y-5"
        >
          <div className="flex flex-col md:px-2 md:flex-row gap-2 md:gap-5 justify-center items-center">
            <div className="w-11/12">
              <legend className="fieldset-legend">Blood Group</legend>
              <select
                required
                {...register("bloodGroup")}
                className="select appearance-none w-full"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              <legend className="fieldset-legend">District</legend>
              <select
                {...register("district")}
                className="select appearance-none w-full"
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district.id}>{district.name}</option>
                ))}
              </select>
              <legend className="fieldset-legend">Upazila</legend>
              <select
                {...register("upazila")}
                className="select appearance-none w-full"
              >
                <option value="">Select Upazila</option>
                {upazilasInSelect.map((upazila) => (
                  <option key={upazila.id}>{upazila.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-linear-to-br mx-auto from-red-600 to-red-300 text-white lg:py-1 w-11/12 md:w-40 lg:w-52 border font-bold md:text-lg border-white rounded-md flex gap-2 justify-center items-center"
          >
            Search
          </button>
        </form>
      </div>
      {donors?.length && (
        <div className="bg-base-200 w-11/12 mx-auto space-y-2 md:space-y-5 py-2 md:py-5 mt-5 md:mt-10 rounded-md">
          <h2 className="text-red-600 text-4xl font-bold text-center">
            Donors Found {`${donors?.length}`}
          </h2>
          <div className="overflow-x-auto bg-white w-11/12 mx-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>index</th>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>District</th>
                  <th>Upazila</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, index) => (
                  <tr key={donor._id}>
                    <td>{index + 1}</td>
                    <td>{donor.name}</td>
                    <td>{donor.bloodGroup}</td>
                    <td>{donor.district}</td>
                    <td>{donor.upazila}</td>
                    <td>{donor.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!donors?.length && show && (
        <div className="bg-base-200 w-11/12 mx-auto space-y-2 md:space-y-5 py-2 md:py-5 mt-5 md:mt-10 rounded-md">
          <h2 className="text-red-600 text-4xl font-bold text-center">
            No Donor Found!
          </h2>
        </div>
      )}
    </div>
  );
};

export default SearchDonor;
