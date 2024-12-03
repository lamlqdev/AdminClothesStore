import { Link } from "react-router-dom";
import { useState } from "react";

import { formatDate } from "../../utils/util";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "Number",
  "Order ID",
  "Order Time",
  "Customer",
  "Total Price",
  "Status",
  "Manage",
];

export default function OrderTable({ orders }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.orderTime) - new Date(a.orderTime)
  );

  const filteredOrders = sortedOrders
    .filter((order) => {
      // Chuyển đổi Firebase Timestamp thành đối tượng Date để so sánh
      const orderDate = new Date(order.orderTime.seconds * 1000); // Firebase Timestamp (seconds) -> Date
      const isWithinDateRange =
        (!startDate || orderDate >= new Date(startDate)) &&
        (!endDate || orderDate <= new Date(endDate));
      return (
        (order.id.toString().includes(searchTerm) ||
          order.userInfo.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (statusFilter === "" || order.orderStatus === statusFilter) &&
        isWithinDateRange
      );
    })
    .reverse();

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex ml-4 items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Order list
            </Typography>
          </div>
        </div>
        <div className="flex flex-col my-4 items-center justify-between gap-4 md:flex-row">
          <div className="flex gap-2 ml-3">
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="border p-2 border-gray-300 rounded-lg shadow-sm pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            >
              <option value="">All</option>
              <option value="Completed">Completed</option>
              <option value="Waiting for payment">Waiting for payment</option>
              <option value="Active">Active</option>
            </select>
          </div>
          <div className="w-full md:w-72 mr-4">
            <div className="relative w-full">
              <Input
                placeholder="Search something..."
                className="border border-gray-300 rounded-lg shadow-sm pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                value={searchTerm}
                onChange={handleSearch}
              />
              <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
          </div>
          {/* Date Range Picker */}
          <div className="flex gap-4">
            <Input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              placeholder="Start Date"
              className="border border-gray-300 rounded-lg shadow-sm pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
            <Input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              placeholder="End Date"
              className="border border-gray-300 rounded-lg shadow-sm pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={order.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order.id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatDate(order.orderTime)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={
                          order.userInfo.imageUrl ||
                          "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                        }
                        alt="user_avatar"
                        size="sm"
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {order.userInfo.name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {order.userInfo.email || "No email"}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {parseFloat(order.total).toFixed(2)} $
                    </Typography>
                  </td>
                  <td className={classes}>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.orderStatus === "Waiting for payment"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.orderStatus === "Active"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className={classes}>
                    <Link to={`/order/${order.id}`}>
                      <Button
                        variant="filled"
                        size="sm"
                        className="bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700"
                      >
                        View Detail
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
