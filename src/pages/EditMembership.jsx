import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { serverTimestamp } from "firebase/firestore";

import { queryClient } from "../api/client";
import Modal from "../components/UI/Modal";
import MembershipForm from "../components/Form/MembershipForm";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorBlock from "../components/UI/ErrorBlock";
import { fetchMembership, updateMembership } from "../api/membershipAPI";

export default function EditMembership() {
  const navigate = useNavigate();
  const params = useParams();

  const {
    data: membership,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["memberships", { id: params.membershipId }],
    queryFn: () => fetchMembership({ id: params.membershipId }),
  });

  const {
    mutate,
    isPending: isPendingUpdate,
    isError: isErrorUpdate,
    error: updateError,
  } = useMutation({
    mutationFn: updateMembership,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
      navigate("..");
    },
  });

  function handleSubmit(data) {
    const updatedMembership = {
      ...data,
      isActive: true,
      updatedAt: serverTimestamp(),
    };
    mutate({ id: params.membershipId, data: updatedMembership });
  }

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occured!"
        message={error.message || "Could not fetch membership"}
      />
    );
  }

  if (membership) {
    content = (
      <>
        {isErrorUpdate && (
          <ErrorBlock
            title="Failed to update category!"
            message={updateError.message || "Could not update category"}
          />
        )}
        <MembershipForm membership={membership} onSubmit={handleSubmit}>
          {isPendingUpdate && <p>Updating...</p>}
          {!isPendingUpdate && (
            <>
              <Link
                to=".."
                className="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update
              </button>
            </>
          )}
        </MembershipForm>
      </>
    );
  }

  return <Modal onClose={() => navigate("..")}>{content}</Modal>;
}
