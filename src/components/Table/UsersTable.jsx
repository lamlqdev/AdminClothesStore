import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/userAPI";
import { fetchMembership } from "../../api/membershipAPI";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";

const TABLE_HEAD = ["Serial", "Name", "Email", "Membership", "Actions"];

export default function UserInfoTable() {
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

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex my-2 items-center justify-between gap-8">
          <Typography variant="h5" color="blue-gray">
            User Information
          </Typography>
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
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id} className="even:bg-blue-gray-50/50">
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
                      {user.name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-100">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.phonelist.length > 0
                        ? user.phonelist[0]
                        : "No phone"}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-100">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {membershipMap[user.membershipLevel] || "Unknown"}
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
      </CardBody>
    </Card>
  );
}
