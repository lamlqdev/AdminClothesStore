import { User, Home, Shield, ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import ErrorBlock from "../components/UI/ErrorBlock";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import Breadcrumb from "../components/Breadcrump";
import { fetchUserProfile } from "../api/userAPI";

const UserProfile = () => {
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["user", { userId: params.userId }],
    queryFn: () => fetchUserProfile({ userId: params.userId }),
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occured!"
        message={error.message || "Could not fetch user data"}
      />
    );
  }

  if (data) {
    const { user, orders } = data;
    content = (
      <>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <User className="h-6 w-6 mr-2 text-blue-600" />
            Personal Information
          </h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>User ID:</strong> {user.userId}
          </p>
          <p>
            <strong>Email:</strong> {user.email ? user.email : "N/A"}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {user.phonelist.length > 0 ? user.phonelist[0] : "N/A"}
          </p>
          <p>
            <strong>Birth Date:</strong>{" "}
            {user.birthDate ? user.birthDate : "N/A"}
          </p>
        </div>

        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Home className="h-6 w-6 mr-2 text-blue-600" />
            Shipping Address
          </h2>
          {user.addresslist.length > 0 ? (
            user.addresslist.map((address, index) => (
              <div key={index}>
                <p>
                  <strong>Address {index + 1}:</strong> {address.street},{" "}
                  {address.ward}, {address.city}, {address.province}
                </p>
              </div>
            ))
          ) : (
            <p>N/A</p>
          )}
        </div>

        {/* Membership Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-blue-600" />
            Membership Information
          </h2>
          <p>
            <strong>Membership Status:</strong>{" "}
            {user.membershipId ? user.membershipId : "Normal Customer"}
          </p>
          <p>
            <strong>Join Date:</strong>{" "}
            {user.createdAt ? user.createdAt : "N/A"}
          </p>
        </div>

        {/* Order History */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <ShoppingCart className="h-6 w-6 mr-2 text-blue-600" />
            Order History
          </h2>
          {orders.length > 0 ? (
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 px-4 py-2 text-left">
                    Order ID
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left">
                    Date
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left">
                    Status
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-b border-gray-300 hover:bg-gray-100 transition duration-200"
                  >
                    <td className="px-4 py-2">{order.orderId}</td>
                    <td className="px-4 py-2">
                      {order.orderTime?.toDate().toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-2">{order.orderStatus}</td>
                    <td className="px-4 py-2">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="container mx-auto p-6 font-poppins">
      <Breadcrumb pageName="User" />
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
      {content}
    </div>
  );
};

export default UserProfile;
