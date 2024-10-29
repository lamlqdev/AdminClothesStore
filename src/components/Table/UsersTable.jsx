import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function UserInfoTable() {
  const TABLE_HEAD = ["User ID", "Name", "Email", "Membership", "Actions"];
  const navigate = useNavigate();
  
  const USERS = [
    {
      userId: "U123456",
      name: "John Doe",
      email: "john.doe@example.com",
      membership: "Gold",
    },
    {
      userId: "U654321",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      membership: "Silver",
    },
    {
      userId: "U789012",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      membership: "Platinum",
    },
  ];

  const handleViewDetails = (userId) => {
    navigate(`/user/${userId}`); // Chuyển hướng đến trang thông tin cá nhân
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex my-4 items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              User Information
            </Typography>
          </div>
          <div className="w-full md:w-72 mr-4">
            <div className="relative w-full md:w-72 mr-4">
              <Input
                placeholder="Search user..."
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
            {USERS.map((user) => (
              <tr key={user.userId} className="even:bg-blue-gray-50/50">
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.userId}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.name}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.email}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.membership}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <button
                    onClick={() => handleViewDetails(user.userId)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
