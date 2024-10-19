import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
} from "@material-tailwind/react";
import { useState } from "react";

const TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const TABLE_HEAD = [
  "Order ID",
  "Date of order",
  "Customer",
  "Price",
  "Status",
  "Manage",
];

const TABLE_ROWS = [
  {
    orderId: "001",
    date: "2024-10-01",
    customer: {
      img: "https://via.placeholder.com/50",
      name: "John Doe",
      email: "johndoe@example.com",
    },
    price: "$50.00",
    status: "Pending",
    online: true,
  },
  {
    orderId: "002",
    date: "2024-10-05",
    customer: {
      img: "https://via.placeholder.com/50",
      name: "Jane Smith",
      email: "janesmith@example.com",
    },
    price: "$75.00",
    status: "Delivered",
    online: false,
  },
  {
    orderId: "003",
    date: "2024-10-10",
    customer: {
      img: "https://via.placeholder.com/50",
      name: "Alice Johnson",
      email: "alicej@example.com",
    },
    price: "$30.00",
    status: "Cancelled",
    online: true,
  },
  {
    orderId: "004",
    date: "2024-10-12",
    customer: {
      img: "https://via.placeholder.com/50",
      name: "Bob Brown",
      email: "bobb@example.com",
    },
    price: "$20.00",
    status: "Pending",
    online: false,
  },
];

export default function OrderTable() {
  const [activeTab, setActiveTab] = useState("all");

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
          <Tabs className="w-full md:w-max ml-3">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={`px-3 py-2 text-sm gap-1 rounded-md transition-all duration-300 ${
                    activeTab === value
                      ? "bg-primaryColor text-white"
                      : "bg-transparent text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72 mr-4">
            <div className="relative w-full md:w-72 mr-4">
              <Input
                placeholder="Search something..."
                className="border border-gray-300 rounded-lg shadow-sm pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
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
            {TABLE_ROWS.map(
              ({ orderId, date, customer, price, status }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={orderId}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {orderId}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={customer.img}
                          alt={customer.name}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {customer.name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {customer.email}
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
                        {price}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={status}
                        color={
                          status === "Delivered"
                            ? "green"
                            : status === "Pending"
                            ? "yellow"
                            : "red"
                        }
                      />
                    </td>
                    <td className={classes}>
                      <Button
                        variant="filled"
                        size="sm"
                        color="#6366F1"
                        className="flex items-center justify-center"
                      >
                        View Detail
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
