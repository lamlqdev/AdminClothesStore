import {
  Avatar,
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useLoaderData } from "react-router-dom";
import { formatDate } from "../utils/util";
import jsPDF from "jspdf";
import "jspdf-autotable";
import robotoFont from "../utils/roboto";

export default function OrderDetail() {
  const orderDetail = useLoaderData();

  const handleExportPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addFileToVFS("Roboto-Regular.ttf", robotoFont);
    pdf.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    pdf.setFont("Roboto");

    // Lấy ngày in
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    // Logo và tiêu đề hóa đơn
    pdf.setFontSize(18);
    pdf.text("Invoice", 105, 20, { align: "center" });

    // Ngày in
    pdf.setFontSize(10);
    pdf.text(`Printed on: ${formattedDate}`, 10, 30);

    // Thông tin đơn hàng
    pdf.setFontSize(12);
    pdf.text("Order Information:", 10, 40);
    pdf.setFontSize(10);
    pdf.text(`Order ID: ${orderDetail.id}`, 15, 50);
    pdf.text(`Order Date: ${formatDate(orderDetail.orderTime)}`, 15, 60);
    pdf.text(`Order Status: ${orderDetail.orderStatus}`, 15, 70);

    // Thông tin khách hàng
    pdf.setFontSize(12);
    pdf.text("Customer Information:", 10, 80);
    pdf.setFontSize(10);
    pdf.text(`Name: ${orderDetail.userInfo.name}`, 15, 90);
    pdf.text(`Email: ${orderDetail.userInfo.email || "No email"}`, 15, 100);
    pdf.text(`Phone: ${orderDetail.phone}`, 15, 110);
    pdf.text(
      `Address: ${orderDetail.address.street}, ${orderDetail.address.ward}, ${orderDetail.address.city}, ${orderDetail.address.province}`,
      15,
      120,
      { maxWidth: 180 }
    );

    // Danh sách sản phẩm (dạng bảng)
    pdf.setFontSize(12);
    pdf.text("Product List:", 10, 140);

    const tableColumn = [
      "No.",
      "Product Name",
      "Quantity",
      "Size",
      "Unit Price",
      "Total Price",
    ];
    const tableRows = [];

    orderDetail.products.forEach((product, index) => {
      const productRow = [
        index + 1,
        product.productName,
        product.quantity,
        product.size,
        `$${product.price.toFixed(2)}`,
        `$${(product.price * product.quantity).toFixed(2)}`,
      ];
      tableRows.push(productRow);
    });

    // Tạo bảng sản phẩm
    pdf.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 150,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [22, 160, 133] }, // Màu header xanh lá
    });

    // Tổng kết hóa đơn
    let finalY = pdf.autoTable.previous.finalY + 10; // Lấy vị trí cuối cùng của bảng
    pdf.setFontSize(12);
    pdf.text("Order Summary:", 10, finalY);
    pdf.setFontSize(10);
    pdf.text(`Total: $${orderDetail.total.toFixed(2)}`, 15, finalY + 10);
    pdf.text(
      `Shipping Cost: $${orderDetail.shippingCost?.toFixed(2) || "1.00"}`,
      15,
      finalY + 20
    );
    pdf.text(
      `Discount Member: ${orderDetail.discountCode || "None"}`,
      15,
      finalY + 30
    );

    // Lưu file PDF
    pdf.save(`Invoice-${orderDetail.id}.pdf`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Order Detail</h1>

      {/* Order Details */}
      <div id="order-detail">
        {/* Order Info */}
        <Card className="mb-6 bg-white">
          <CardBody>
            <Typography variant="h5" className="mb-2">
              Order Information
            </Typography>
            <p>
              <strong>Order ID:</strong> {orderDetail.id}
            </p>
            <p>
              <strong>Date of Order:</strong>{" "}
              {formatDate(orderDetail.orderTime)}
            </p>
            <p>
              <strong>Status:</strong> {orderDetail.orderStatus}
            </p>
          </CardBody>
        </Card>

        {/* Customer Info */}
        <Card className="mb-6 bg-white">
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
                  <strong>Shipping Address:</strong>{" "}
                  {orderDetail.address.street}, {orderDetail.address.ward},{" "}
                  {orderDetail.address.city}, {orderDetail.address.province}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Product List */}
        <Card className="mb-6 bg-white">
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
              <strong>Shipping Cost:</strong> ${orderDetail.shippingCost || "1"}
            </p>
            <p>
              <strong>Discount Member:</strong>{" "}
              {orderDetail.discountCode || "None"}
            </p>
          </CardBody>
        </Card>
      </div>
      <div className="text-right mb-4">
        <Button
          onClick={handleExportPDF}
          color="blue"
          ripple="light"
          className="mt-4 mr-2"
        >
          Print invoice
        </Button>
      </div>
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
