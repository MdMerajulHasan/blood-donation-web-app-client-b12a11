import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import useRole from "../../hooks/useRole";

const Update = () => {
  const { id } = useParams();
  const { role } = useRole();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();

  const { isLoading: remainDataLoading, data: loadedData = [] } = useQuery({
    queryKey: ["remains-data-load-to-update"],
    queryFn: async () => {
      const result = await axiosSecure
        .get(`/request/${id}/details?email=${user?.email}`)
        .catch((error) => alert(error.message));
      return result?.data;
    },
  });

  const handleUpdate = (data) => {
    console.log(data);
    axiosSecure
      .patch(`/update/${id}/request-data?email=${user?.email}`, data)
      .then((res) => {
        if (res.data.modifiedCount) {
          alert("Data Updated!");
          if (role === "donor") {
            navigate("/dashboard/my-donation-requests");
          } else {
            navigate("/dashboard/all-blood-donation-request");
          }
        }
      })
      .catch((error) => alert(error.message));
  };

  if (remainDataLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-base-200 space-y-2 md:space-y-5 py-1 md:py-5 rounded-md">
      <h2 className="text-red-600 text-2xl md:text-4xl font-bold text-center">
        Request Update
      </h2>
      <form
        onSubmit={handleSubmit(handleUpdate)}
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
              value={`${user?.displayName}` || ""}
              placeholder={`${user?.displayName}`}
              readOnly
            />
            {/* Requester Email */}
            <legend className="fieldset-legend">Requester Email</legend>
            <input
              className="input w-full"
              type="email"
              {...register("requesterEmail")}
              value={`${user?.email}` || ""}
              placeholder={`${user?.email}`}
              readOnly
            />
            {/* Recipient Name */}
            <legend className="fieldset-legend">Recipient Name</legend>
            <input
              className="input w-full"
              type="text"
              defaultValue={loadedData?.recipientName || ""}
              {...register("recipientName")}
              placeholder={loadedData?.recipientName}
              required
            />
            {/* Recipient District */}
            <legend className="fieldset-legend">Recipient District</legend>
            <input
              className="input w-full"
              type="text"
              defaultValue={loadedData?.recipientDistrict || ""}
              {...register("recipientDistrict")}
              placeholder={loadedData?.recipientDistrict}
              required
            />
            {/* Recipient Upazila */}
            <legend className="fieldset-legend">Recipient Upazila</legend>
            <input
              className="input w-full"
              type="text"
              defaultValue={loadedData?.recipientUpazila || ""}
              {...register("recipientUpazila")}
              placeholder={loadedData?.recipientUpazila}
              required
            />
          </div>
          <div className="w-11/12 md:w-1/2">
            {/* Hospital Name */}
            <legend className="fieldset-legend">Hospital Name</legend>
            <input
              className="input w-full"
              type="text"
              required
              defaultValue={loadedData?.hospitalName || ""}
              {...register("hospitalName")}
              placeholder={loadedData?.hospitalName}
            />
            {/* Hospital Full Address */}
            <legend className="fieldset-legend">Full Address</legend>
            <input
              className="input w-full"
              type="text"
              required
              defaultValue={loadedData?.fullAddress || ""}
              {...register("fullAddress")}
              //   placeholder={loadedData?.fullAddress}
            />
            {/* Blood Group */}
            <legend className="fieldset-legend">Blood Group</legend>
            <input
              className="input w-full"
              required
              defaultValue={loadedData?.bloodGroup || ""}
              {...register("bloodGroup")}
              placeholder={loadedData?.bloodGroup}
            />
            {/* Donation Date */}
            <legend className="fieldset-legend">Donation Date</legend>
            <input
              type="date"
              required
              defaultValue={loadedData?.donationDate || ""}
              {...register("donationDate")}
              className="input w-full"
              placeholder={loadedData?.donationDate}
            />
            {/* Donation Time */}
            <legend className="fieldset-legend">Donation Time</legend>
            <input
              type="time"
              required
              defaultValue={loadedData?.donationTime || ""}
              {...register("donationTime")}
              className="input w-full"
              placeholder={loadedData?.donationTime}
            />
          </div>
        </div>
        <div className="w-11/12 md:w-auto mx-auto md:mx-2">
          <legend className="fieldset-legend">Message</legend>
          <textarea
            className="textarea w-full"
            required
            defaultValue={loadedData?.donationMessage || ""}
            {...register("donationMessage")}
            placeholder={loadedData?.donationMessage}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-linear-to-br mx-auto from-red-600 to-red-300 text-white lg:py-1 w-11/12 md:w-40 lg:w-52 border font-bold md:text-lg border-white rounded-md flex gap-2 justify-center items-center"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
