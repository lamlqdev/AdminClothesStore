import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/userAPI";
import { fetchMembership } from "../../api/membershipAPI";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";

const TABLE_HEAD = ["Serial", "Name", "Phone number", "Membership", "Actions"];

export default function UserInfoTable() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const {
    data: memberships,
    isLoading: isMembershipsLoading,
    isError: isMembershipsError,
    error: membershipsError,
  } = useQuery({
    queryKey: ["memberships"],
    queryFn: fetchMembership,
  });

  if (isUsersLoading || isMembershipsLoading) return <LoadingIndicator />;
  if (isUsersError || isMembershipsError)
    return (
      <ErrorBlock
        title="An error occurred!"
        message={
          usersError?.message ||
          membershipsError?.message ||
          "Could not fetch data"
        }
      />
    );

  // Map membership ID to name for quick lookup
  const membershipMap = memberships.reduce((map, membership) => {
    map[membership.id] = membership.membershipName;
    return map;
  }, {});

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="h-full w-full">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none w-full"
      >
        <div className="flex my-2 justify-between w-full">
          {/* Tiêu đề bên trái */}
          <Typography variant="h5" color="blue-gray" className="w-full">
            User Information
          </Typography>

          {/* Ô tìm kiếm bên phải */}
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg shadow-sm pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 max-w-sm"
          />
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
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={user.id || index} className="even:bg-blue-gray-50/50">
                  <td className="p-4 border-b border-blue-gray-100">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-100">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.name || "No Name"}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-100">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.phonelist?.[0] || "No Phone"}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-100">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {membershipMap[user.membershipLevel] || "No Membership"}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-100">
                    <Link to={`user-detail/${user.id || ""}`}>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                        disabled={!user.id} // Disable button if user ID is missing
                      >
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
