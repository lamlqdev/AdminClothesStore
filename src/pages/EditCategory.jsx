import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { serverTimestamp } from "firebase/firestore";

import Modal from "../components/UI/Modal";
import CategoryForm from "../components/Form/CategoryForm";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorBlock from "../components/UI/ErrorBlock";
import { fetchCategory, queryClient, updateCategory } from "../api/firebaseApi";

export default function EditCategory() {
  const navigate = useNavigate();
  const params = useParams();

  const {
    data: category,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories", { id: params.categoryId }],
    queryFn: () => fetchCategory({ id: params.categoryId }),
  });

  const {
    mutate,
    isPending: isPendingUpdate,
    isError: isErrorUpdate,
    error: updateError,
  } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      navigate("..");
    },
  });

  function handleSubmit(data) {
    const updateCategory = {
      ...data,
      isVisible: true,
      updatedAt: serverTimestamp(),
    };
    mutate({ id: params.categoryId, data: updateCategory });
  }

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occured!"
        message={error.message || "Could not fetch categories"}
      />
    );
  }

  if (category) {
    content = (
      <>
        {isErrorUpdate && (
          <ErrorBlock
            title="Failed to update category!"
            message={updateError.message || "Could not update category"}
          />
        )}
        <CategoryForm category={category} onSubmit={handleSubmit}>
          {isPendingUpdate && <p>Updating...</p>}
          {!isPendingUpdate && (
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
                Update
              </button>
            </>
          )}
        </CategoryForm>
      </>
    );
  }

  return <Modal onClose={() => navigate("..")}>{content}</Modal>;
}
