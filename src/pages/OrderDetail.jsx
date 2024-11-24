import { Avatar, Card, CardBody, Typography } from "@material-tailwind/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useLoaderData } from "react-router-dom";
import { formatDate } from "../utils/util";

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
            <strong>Date of Order:</strong> {formatDate(orderDetail.orderTime)}
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
          <Typography variant="h5" className="mb-4">
            Product List
          </Typography>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-center p-2 border-b ">No.</th>
                <th className="text-center p-2 border-b">Product Image</th>
                <th className="text-center p-2 border-b">Product Name</th>
                <th className="text-center p-2 border-b">Quantity</th>
                <th className="text-center p-2 border-b">Size</th>
                <th className="text-center p-2 border-b">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail.products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 border-b text-center">{index + 1}</td>
                  <td className="p-2 border-b text-center">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="h-16 w-16 object-cover rounded-lg mx-auto"
                    />
                  </td>
                  <td className="p-2 border-b text-center">
                    {product.productName}
                  </td>
                  <td className="p-2 border-b text-center">
                    {product.quantity}
                  </td>
                  <td className="p-2 border-b text-center">{product.size}</td>
                  <td className="p-2 border-b text-center">
                    ${product.price * product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
