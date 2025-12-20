import React from "react";
import { Typewriter } from "react-simple-typewriter";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { CgDetailsMore } from "react-icons/cg";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading: my3ReqLoading, data: my3Req = [] } = useQuery({
    queryKey: ["my-recent-three-requests"],
    queryFn: async () => {
      const res = await axiosSecure
        .get("/my-recent-requests")
        .catch((err) => alert(err.message));
      return res.data;
    },
  });

  if (my3ReqLoading) {
    return <Loading></Loading>;
  } else {
    return (
      <div>
        <div className="text-red-600 text-4xl font-bold text-center my-5 md:my-10">
          <Typewriter
            words={[`Welcome ${user.displayName}`]}
            loop
            cursor
          ></Typewriter>
        </div>
        {my3Req.length > 0 && (
          <div className="bg-base-100 w-11/12 mx-auto space-y-2 md:space-y-5 py-2 md:py-5 mt-5 md:mt-10 rounded-md">
            <h2 className="text-red-600 text-2xl md:text-4xl font-bold text-center">
              Recent requests
            </h2>
            <div className="overflow-x-auto bg-white w-11/12 mx-auto">
              <table className="table table-zebra text-[10px] md:text-base text-center">
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
                  {my3Req.map((r) => (
                    <tr key={r._id}>
                      <td>{r.recipientName}</td>
                      <td>
                        {r.recipientUpazila},{r.recipientDistrict}
                      </td>
                      <td>{r.donationDate}</td>
                      <td>{r.donationTime}</td>
                      <td>{r.bloodGroup}</td>
                      <td>{r.donationStatus}</td>
                      <td>
                        <div className="flex gap-0.5 lg:gap-2 justify-center items-center">
                          <span>
                            <FaEdit />
                          </span>
                          <span>
                            <RiDeleteBinFill />
                          </span>
                          <span>
                            <CgDetailsMore />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default DashboardHome;
