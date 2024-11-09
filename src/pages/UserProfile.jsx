import { User, Home, Shield, ShoppingCart } from "lucide-react";
import Breadcrumb from "../components/Breadcrump";
import { useLoaderData } from "react-router-dom";
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const UserProfile = () => {
  const { user, orders } = useLoaderData();

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
          <strong>Email:</strong> {user.email ? user.email : "N/A"}
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          {user.phonelist.length > 0 ? user.phonelist[0] : "N/A"}
        </p>
        <p>
          <strong>Birth Date:</strong> {user.birthDate ? user.birthDate : "N/A"}
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
          <strong>Join Date:</strong> {user.createdAt ? user.createdAt : "N/A"}
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
    </div>
  );
};

export default UserProfile;

export async function loader({ params }) {
  const userId = params.userId;

  // Lấy thông tin user
  const userDoc = await getDoc(doc(db, "users", userId));
  if (!userDoc.exists()) {
    throw new Error("User not found");
  }
  const user = { id: userDoc.id, ...userDoc.data() };

  // Lấy danh sách các đơn hàng của user
  const ordersQuery = query(
    collection(db, "Orders"),
    where("userId", "==", userId)
  );
  const ordersSnapshot = await getDocs(ordersQuery);
  const orders = ordersSnapshot.docs.map((doc) => ({
    orderId: doc.id,
    ...doc.data(),
  }));

  return { user, orders };
}
