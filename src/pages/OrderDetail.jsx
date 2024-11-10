import React from "react";
import { Avatar, Card, CardBody, Typography } from "@material-tailwind/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useLoaderData } from "react-router-dom";

export default function OrderDetail() {
  const orderDetail = useLoaderData();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Order Detail</h1>
      {/* Order Info */}
      <Card className="mb-6">
        <CardBody>
          <Typography variant="h5" className="mb-2">
            Order Information
          </Typography>
          <p>
            <strong>Order ID:</strong> {orderDetail.id}
          </p>
          <p>
            <strong>Date of Order:</strong>{" "}
            {orderDetail.orderTime?.toDate().toLocaleDateString("en-GB")}
          </p>
          <p>
            <strong>Status:</strong> {orderDetail.orderStatus}
          </p>
        </CardBody>
      </Card>

      {/* Customer Info */}
      <Card className="mb-6">
        <CardBody>
          <Typography variant="h5" className="mb-2">
            Customer Information
          </Typography>
          <div className="flex items-center">
            <Avatar
              src={
                orderDetail.userInfo.imageUrl ||
                "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
              }
              alt="user_avatar"
              className="mr-4"
            />
            <div>
              <p>
                <strong>Name:</strong> {orderDetail.userInfo.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {orderDetail.userInfo.email || "No email"}
              </p>
              <p>
                <strong>Phone:</strong> {orderDetail.phone}
              </p>
              <p>
                <strong>Shipping Address:</strong> {orderDetail.address.street},{" "}
                {orderDetail.address.ward}, {orderDetail.address.city},{" "}
                {orderDetail.address.province}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Product List */}
      <Card className="mb-6">
        <CardBody>
          <Typography variant="h5" className="mb-2">
            Product List
          </Typography>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {orderDetail.products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg shadow-lg p-4 bg-white"
              >
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="h-38 w-full object-cover rounded-t-lg"
                />
                <div className="mt-2">
                  <Typography variant="h6" className="font-semibold">
                    {product.productName}
                  </Typography>
                  <p>
                    <strong>Quantity:</strong> {product.quantity}
                  </p>
                  <p>
                    <strong>Size:</strong> {product.size}
                  </p>
                  <p>
                    <strong>Total Price:</strong> $
                    {product.price * product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardBody>
          <Typography variant="h5" className="mb-2">
            Order Summary
          </Typography>
          <p>
            <strong>Total:</strong> ${orderDetail.total}
          </p>
          <p>
            <strong>Shipping Cost:</strong> ${orderDetail.shippingCost || "0"}
          </p>
          <p>
            <strong>Discount Member:</strong>{" "}
            {orderDetail.discountCode || "None"}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

export async function loader({ params }) {
  const { orderId } = params;
  const orderDoc = await getDoc(doc(db, "Orders", orderId));
  if (!orderDoc.exists()) {
    throw new Error("Order not found");
  }
  const order = { id: orderDoc.id, ...orderDoc.data() };

  // Fetch user info
  const userDoc = await getDoc(doc(db, "users", order.userId));
  const userInfo = userDoc.exists() ? userDoc.data() : null;

  return {
    ...order,
    userInfo,
  };
}
