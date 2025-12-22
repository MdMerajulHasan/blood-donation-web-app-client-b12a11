import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Request = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState([]);
  useEffect(() => {
    axiosSecure
      .get(`/request/${id}/details?email=${user?.email}`)
      .then((res) => setRequest(res.data))
      .catch((err) => alert(err.message));
  }, [id, axiosSecure, user]);

  const handleDonate = (id) => {
    Swal.fire({
      title: "Are you sure?",
      html: `<div style="text-align:left">
  <label style="display:flex">Donor Name</label>
  <input readonly style="background-color: #FCA5A5; padding: 2px; border-radius: 4px" type="text" value=${user?.displayName}/>
  <label style="display:flex">Donor Email</label>
  <input readonly style="background-color: #FCA5A5; padding: 2px; border-radius: 4px" type="email" value=${user?.email}/>
  </div>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, donate!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/update/${id}/`, {
            donorName: user?.displayName,
            donorEmail: user?.email,
          })
          .then((res) => {
            if (res.data.modifiedCount) {
              Swal.fire({
                title: "Confirmed!",
                text: "Your donation inprogress",
                icon: "success",
              });
              navigate("/donation-requests");
            }
          })
          .catch((error) => alert(error.message));
      }
    });
  };

  return (
    <div className="bg-base-200 w-11/12 mx-auto space-y-2 md:space-y-5 py-2 md:py-5 mt-5 md:mt-10 rounded-md">
      <h2 className="text-red-600 text-2xl md:text-4xl font-bold text-center">
        Request Details
      </h2>
      <div className="overflow-x-auto bg-white w-11/12 mx-auto">
        <table className="table table-zebra table-xs table-pin-rows table-pin-cols text-[10px] md:text-base text-center">
          {/* head */}
          <tbody>
            <tr>
              <th className="text-[#00000099] text-left">Requester Name</th>
              <td className="text-left">{request.requesterName}</td>
            </tr>
            <tr>
              <th className="text-[#00000099] text-left"> Requester Email</th>
              <td className="text-left">{request.requesterEmail}</td>
            </tr>
            <tr>
              <th className="text-[#00000099] text-left">Recipient Name</th>
              <td className="text-left">{request.recipientName}</td>
            </tr>
            <tr>
              <th className="text-[#00000099] text-left">Recipient Location</th>
              <td className="text-left">
                {request.recipientUpazila},{request.recipientDistrict}
              </td>
            </tr>
            <tr>
              <th className="text-[#00000099] text-left">Hospital Name</th>
              <td className="text-left">{request.hospitalName}</td>
            </tr>
            <tr>
              <th className="text-[#00000099] text-left">Hospital Address</th>
              <td className="text-left">{request.fullAddress}</td>
            </tr>
            <tr>
              <th className="text-[#00000099] text-left">Blood Group</th>
              <td className="text-left">{request.bloodGroup}</td>
            </tr>
            <tr>
              <th className="text-[#00000099] text-left">Donation Date</th>
              <td className="text-left">{request.donationDate}</td>
            </tr>
            <tr>
              <th className="text-[#00000099] text-left">Donation Time</th>
              <td className="text-left">{request.donationTime}</td>
            </tr>
            <tr>
              <th className="text-[#00000099] text-left">Donation Message</th>
              <td className="text-left">{request.donationMessage}</td>
            </tr>
            <tr>
              <th className="text-[#00000099] text-left">Action</th>
              <td className="text-left">
                {request?.donationStatus === "pending" ? (
                  <button
                    onClick={() => handleDonate(request._id)}
                    className="bg-green-600 text-white px-2 py-1 rounded-md font-bold"
                  >
                    Donate
                  </button>
                ) : (
                  <p>{request?.donationStatus}</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Request;
