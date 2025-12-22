import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { CgDetailsMore } from "react-icons/cg";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    isLoading: allRequestsLoading,
    data: allRequests = [],
    refetch,
  } = useQuery({
    queryKey: ["all-own-donation-requests"],
    queryFn: async () => {
      const result = await axiosSecure
        .get("/my-donation-requests")
        .catch((error) => alert(error.message));
      return result.data;
    },
  });

  const handleStatus = (status, id) => {
    axiosSecure
      .patch(`/update/${id}/progress?email=${user?.email}`, {
        status,
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          navigate("/dashboard/my-donation-requests");
        }
      });
  };

  const handleDelete = (id) => {
    axiosSecure
      .delete(`/delete/${id}?email=${user?.email}`)
      .then((res) => {
        if (res.data.deletedCount) {
          alert("Deleted!");
          refetch();
          navigate("/dashboard/my-donation-requests");
        }
      })
      .catch((error) => alert(error.message));
  };

  if (allRequestsLoading) {
    return <Loading></Loading>;
  } else {
    return (
      <>
        {allRequests.length > 0 ? (
          <div className="bg-base-100 w-11/12 mx-auto space-y-2 md:space-y-5 py-2 md:py-5 mt-5 md:mt-10 rounded-md">
            <h2 className="text-red-600 text-2xl md:text-4xl font-bold text-center">
              Your All Requests
            </h2>
            <div className="overflow-x-auto bg-white w-11/12 mx-auto">
              <table className="table table-zebra table-xs table-pin-rows table-pin-cols text-[10px] md:text-base text-center">
                {/* head */}
                <thead>
                  <tr>
                    <th>Recipient</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Blood Group</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allRequests.map((r) => (
                    <tr key={r._id}>
                      <td>{r.recipientName}</td>
                      <td>
                        {r.recipientUpazila},{r.recipientDistrict}
                      </td>
                      <td>{r.donationDate}</td>
                      <td>{r.donationTime}</td>
                      <td>{r.bloodGroup}</td>
                      <td className="flex gap-1 justify-center items-center">
                        {r.donationStatus === "done" && (
                          <p className="text-white bg-green-600 p-1 rounded-sm">
                            {r.donationStatus}
                          </p>
                        )}
                        {r.donationStatus === "pending" && (
                          <>{r.donationStatus}</>
                        )}
                        {r.donationStatus === "canceled" && (
                          <p className="text-white bg-red-600 p-1 rounded-sm">
                            {r.donationStatus}
                          </p>
                        )}
                        {r.donationStatus === "inprogress" && (
                          <>
                            <button
                              onClick={() => handleStatus("done", r._id)}
                              title="Done"
                              className="bg-green-600 p-1 rounded-sm text-white"
                            >
                              Done
                            </button>
                            <button
                              onClick={() => handleStatus("canceled", r._id)}
                              title="Cancel"
                              className="bg-red-600 p-1 rounded-sm text-white"
                            >
                              Cancel
                            </button>
                            <div className="text-start">
                              <p>{r.donorName}</p>
                              <p>{r.donorEmail}</p>
                            </div>
                          </>
                        )}
                      </td>
                      <td>
                        <div className="flex gap-0.5 lg:gap-2 justify-center items-center">
                          <Link to={`/dashboard/update/${r._id}`}>
                            <span>
                              <FaEdit />
                            </span>
                          </Link>
                          <button onClick={() => handleDelete(r._id)}>
                            <span>
                              <RiDeleteBinFill />
                            </span>
                          </button>
                          <Link
                            to={`/request/${r._id}`}
                          >
                            <span>
                              <CgDetailsMore />
                            </span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-base-100 w-11/12 mx-auto space-y-2 md:space-y-5 py-2 md:py-5 mt-5 md:mt-10 rounded-md">
            <h2 className="text-red-600 text-2xl md:text-4xl font-bold text-center">
              You Have No Request
            </h2>
          </div>
        )}
      </>
    );
  }
};

export default MyDonationRequests;
