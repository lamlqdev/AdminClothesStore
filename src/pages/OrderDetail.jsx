import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function OrderDetail() {
  // Dummy order data
  const order = {
    orderId: "123456",
    date: "2024-10-29",
    status: "Shipped",
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      img: "https://via.placeholder.com/150",
    },
    shippingAddress: "123 Main St, Anytown, USA",
    products: [
      {
        id: "1",
        name: "T-Shirt",
        image: "https://via.placeholder.com/150",
        quantity: 2,
        size: "M",
        price: 25.0,
      },
      {
        id: "2",
        name: "Jeans",
        image: "https://via.placeholder.com/150",
        quantity: 1,
        size: "L",
        price: 50.0,
      },
    ],
    total: 100.0,
    shippingCost: 5.0,
    discountCode: "SAVE10",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Order Info */}
      <Card className="mb-6">
        <CardBody>
          <Typography variant="h5" className="mb-2">
            Order Information
          </Typography>
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p>
            <strong>Date of Order:</strong> {order.date}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
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
              src={order.customer.img}
              alt={order.customer.name}
              className="mr-4"
            />
            <div>
              <p>
                <strong>Name:</strong> {order.customer.name}
              </p>
              <p>
                <strong>Email:</strong> {order.customer.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.customer.phone}
              </p>
              <p>
                <strong>Shipping Address:</strong> {order.shippingAddress}
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
            {order.products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg shadow-lg p-4 bg-white"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 w-full object-cover rounded-t-lg"
                />
                <div className="mt-2">
                  <Typography variant="h6" className="font-semibold">
                    {product.name}
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
            <strong>Total:</strong> ${order.total}
          </p>
          <p>
            <strong>Shipping Cost:</strong> ${order.shippingCost}
          </p>
          <p>
            <strong>Discount Member:</strong> {order.discountCode || "None"}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
