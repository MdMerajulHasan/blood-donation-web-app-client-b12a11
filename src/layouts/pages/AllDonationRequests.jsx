import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { CgDetailsMore } from "react-icons/cg";

const AllDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    isLoading: allDonationLoading,
    data: allRequestsAdmin = [],
    refetch,
  } = useQuery({
    queryKey: ["all-donation-requests-admin"],
    queryFn: async () => {
      const result = await axiosSecure
        .get(`/all-donation-requests?email=${user?.email}`)
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
          navigate("/dashboard/all-blood-donation-request");
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
          navigate("/dashboard/all-blood-donation-request");
        }
      })
      .catch((error) => alert(error.message));
  };

  if (allDonationLoading) {
    return <Loading></Loading>;
  } else {
    return (
      <>
        {allRequestsAdmin.length > 0 ? (
          <div className="bg-base-100 w-11/12 mx-auto space-y-2 md:space-y-5 py-2 md:py-5 mt-5 md:mt-10 rounded-md">
            <h2 className="text-red-600 text-2xl md:text-4xl font-bold text-center">
              All Requests({allRequestsAdmin.length})
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
                  {allRequestsAdmin.map((r) => (
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
                          <Link to={`/request/${r._id}`}>
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
              No Request Created Yet
            </h2>
          </div>
        )}
      </>
    );
  }
};

export default AllDonationRequests;
