import { useNavigate, Link } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import { useMutation } from "@tanstack/react-query";

import CategoryForm from "../components/Form/CategoryForm";
import Modal from "../components/UI/Modal";
import { createCategory, queryClient } from "../api/firebaseApi";

export default function NewCategory() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      navigate("..");
    },
  });

  function handleSubmit(formData) {
    const newCategory = {
      ...formData,
      isVisible: true,
      createdAt: serverTimestamp(),
    };
    mutate({newCategory});
  }

  return (
    <Modal onClose={() => navigate("..")}>
      <CategoryForm onSubmit={handleSubmit}>
        {isPending && <p>Creating category...</p>}
        {!isPending && (
          <>
            <Link
              to="../"
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
        {isError && (
          <ErrorBlock
            title="Failed to create category"
            message={error.message || "Please check and try again."}
          />
        )}
      </CategoryForm>
    </Modal>
  );
}
