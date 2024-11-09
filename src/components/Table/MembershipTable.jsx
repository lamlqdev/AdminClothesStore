import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import { useState } from "react";
import DeleteMembershipModal from "../Modal/DeleteMembershipModal";
import ManageMembershipModal from "../Modal/ManageMembershipModal";

export default function MembershipTable({ memberships }) {
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isModalManageOpen, setModalManageOpen] = useState(false);
  const [membershipToEdit, setMembershipToEdit] = useState(null);

  const handleCreateClick = () => {
    setMembershipToEdit(null);
    setModalManageOpen(true);
  };

  const handleEditClick = (membership) => {
    setMembershipToEdit(membership);
    setModalManageOpen(true);
  };

  const handleDeleteClick = (membership) => {
    setMembershipToEdit(membership);
    setModalDeleteOpen(true);
  };

  const TABLE_HEAD = [
    "Membership name",
    "Minimum spend amount",
    "Discount rate",
    "Manage",
  ];

  return (
    <Card className="h-full w-full">
      {isModalDeleteOpen && (
        <DeleteMembershipModal
          open={isModalDeleteOpen}
          setOpen={setModalDeleteOpen}
          membership={membershipToEdit}
        />
      )}
      {isModalManageOpen && (
        <ManageMembershipModal
          open={isModalManageOpen}
          setOpen={setModalManageOpen}
          membership={membershipToEdit}
        />
      )}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-3 flex mx-4 items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Membership list
            </Typography>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded"
            onClick={handleCreateClick}
          >
            Create membership
          </button>
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
            {memberships.map((membership) => (
              <tr key={membership.id} className="even:bg-blue-gray-50/50">
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {membership.membershipName}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {`${membership.minimumSpend} VND`}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {`${membership.discountRate} %`}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-3 rounded text-sm"
                      onClick={() => handleEditClick(membership)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-400 hover:bg-red-500 text-white py-1 px-3 rounded text-sm"
                      onClick={() => handleDeleteClick(membership)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
