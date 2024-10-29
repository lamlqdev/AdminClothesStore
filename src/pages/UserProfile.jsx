import React from "react";
import { User, Home, Shield, ShoppingCart, FileText } from "lucide-react";
import Breadcrumb from "../components/Breadcrump";

const UserProfile = () => {
  const user = {
    userId: "U123456",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    birthDate: "01/01/1990",
    address: {
      street: "123 Main St",
      city: "City",
      country: "Country",
    },
    membership: {
      status: "Gold",
      joinDate: "01/01/2020",
    },
    orderHistory: [
      { orderId: "O001", date: "01/10/2024", total: "$150.00" },
      { orderId: "O002", date: "15/09/2024", total: "$75.00" },
    ],
    notes: "Customer requests to call before delivery.",
  };

  return (
    <div className="container mx-auto p-6 font-poppins">
      <Breadcrumb pageName="User" />
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>

      {/* Personal Information */}
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
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Birth Date:</strong> {user.birthDate}
        </p>
      </div>

      {/* Shipping Address */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Home className="h-6 w-6 mr-2 text-blue-600" />
          Shipping Address
        </h2>
        <p>
          <strong>Address:</strong> {user.address.street}, {user.address.city},{" "}
          {user.address.country}
        </p>
      </div>

      {/* Membership Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Shield className="h-6 w-6 mr-2 text-blue-600" />
          Membership Information
        </h2>
        <p>
          <strong>Membership Status:</strong> {user.membership.status}
        </p>
        <p>
          <strong>Join Date:</strong> {user.membership.joinDate}
        </p>
      </div>

      {/* Order History */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <ShoppingCart className="h-6 w-6 mr-2 text-blue-600" />
          Order History
        </h2>
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
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {user.orderHistory.map((order) => (
              <tr
                key={order.orderId}
                className="border-b border-gray-300 hover:bg-gray-100 transition duration-200"
              >
                <td className="px-4 py-2">{order.orderId}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FileText className="h-6 w-6 mr-2 text-blue-600" />
          Notes
        </h2>
        <p>{user.notes}</p>
      </div>
    </div>
  );
};

export default UserProfile;
