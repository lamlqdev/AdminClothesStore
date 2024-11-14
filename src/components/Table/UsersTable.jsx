import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../api/userAPI";
import ErrorBlock from "../UI/ErrorBlock";
import LoadingIndicator from "../UI/LoadingIndicator";

const TABLE_HEAD = ["User ID", "Name", "Email", "Membership", "Actions"];

export default function UserInfoTable() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", { search: searchTerm }],
    queryFn: () => fetchUsers({ searchTerm }),
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occured!"
        message={error.message || "Could not fetch users"}
      />
    );
  }

  if (users) {
    content = (
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
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="even:bg-blue-gray-50/50">
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.id}
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
                    {user.email ? user.email : "No email"}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.membershipId ? user.membershipId : "Normal Customer"}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <Link to={`user-detail/${user.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex my-2 items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              User Information
            </Typography>
          </div>
          <div className="w-full md:w-72 mr-4">
            <div className="relative w-full md:w-72 mr-4">
              <form
                onSubmit={handleSubmit}
                className="flex items-center space-x-4"
              >
                <input
                  type="search"
                  placeholder="Search by name"
                  ref={searchElement}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-1 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-0">{content}</CardBody>
    </Card>
  );
}
