import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import ErrorBlock from "../UI/ErrorBlock";
import LoadingIndicator from "../UI/LoadingIndicator";
import Modal from "../UI/Modal";
import { fetchMemberships, deleteMembership } from "../../api/membershipAPI";
import { queryClient } from "../../api/client";

const TABLE_HEAD = [
  "Membership name",
  "Minimum spend amount",
  "Discount rate",
  "Manage",
];

export default function MembershipTable() {
  const [isDeleting, setDeleting] = useState(false);
  const [membershipDeleteId, setMembershipDeleteId] = useState(null);

  const navigate = useNavigate();

  const {
    data: memberships,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["memberships"],
    queryFn: fetchMemberships,
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteMembership,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["memberships"],
        refetchType: "none",
      });
      navigate("/crm");
    },
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occured!"
        message={error.message || "Could not fetch memberships"}
      />
    );
  }

  if (memberships) {
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
                  {`${membership.minimumSpend} $`}
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
                  <Link
                    to={`${membership.id}/edit`}
                    className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-3 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-400 hover:bg-red-500 text-white py-1 px-3 rounded text-sm"
                    onClick={() => handleStartDelete(membership.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function handleStartDelete(id) {
    setDeleting(true);
    setMembershipDeleteId(id);
  }

  function handleCancelDelete() {
    setDeleting(false);
  }

  function handleDelete() {
    mutate({ id: membershipDeleteId });
  }

  return (
    <Card className="h-full w-full">
      {isDeleting && (
        <Modal onClose={handleCancelDelete}>
          <ExclamationTriangleIcon className="h-10 w-10 text-red-600" />
          <h1 className="font-bold text-lg my-2">Are you sure?</h1>
          <p>
            Do you want to delete this membership? This action cannot be undone
          </p>
          <div className="mt-2 flex justify-end items-center gap-4">
            {isPendingDeletion && <p>Deleting...</p>}
            {!isPendingDeletion && (
              <>
                <Link
                  onClick={handleCancelDelete}
                  className="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  onClick={handleDelete}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDeleting && (
            <ErrorBlock
              title={"Failed to delete event"}
              message={deleteError.message || "Please try again"}
            />
          )}
        </Modal>
      )}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-3 flex mx-4 items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Membership list
            </Typography>
          </div>

          <Link
            to="new"
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded"
          >
            Create membership
          </Link>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-0">{content}</CardBody>
    </Card>
  );
}
