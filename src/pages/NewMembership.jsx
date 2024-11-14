import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { serverTimestamp } from "firebase/firestore";

import Modal from "../components/UI/Modal";
import MembershipForm from "../components/Form/MembershipForm";
import { createMembership } from "../api/membershipAPI";
import { queryClient } from "../api/client";

export default function NewMembership() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createMembership,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
      navigate("..");
    },
  });

  function handleSubmit(formData) {
    const newMembership = {
      ...formData,
      isActive: true,
      createdAt: serverTimestamp(),
    };
    mutate({ newMembership });
  }

  return (
    <Modal onClose={() => navigate("..")}>
      <MembershipForm onSubmit={handleSubmit}>
        {isPending && <p>Creating...</p>}
        {!isPending && (
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
              Create
            </button>
          </>
        )}
      </MembershipForm>
      {isError && (
        <ErrorBlock
          title="Failed to create membership"
          message={error.message || "Please check and try again."}
        />
      )}
    </Modal>
  );
}
